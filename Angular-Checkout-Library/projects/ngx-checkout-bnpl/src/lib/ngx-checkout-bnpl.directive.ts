import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import {
  CheckoutOptions,
  PrivateCheckoutOptions,
  TransactionDetails,
} from './checkout-options';
import { NgxCheckoutBnplService } from './ngx-checkout-bnpl.service';

interface CurrentWindow extends Window {
  Connect: {
    (options: Partial<CheckoutOptions>): { setup(): any; open(): any };
  };
}
declare var window: CurrentWindow;
@Directive({
  selector: '[ngx-checkout-bnpl]',
  standalone: true
})
export class NgxCheckoutBnplDirective {
  @Input() publicKey: string = '';
  @Input() isLive: boolean = false;
  @Input() signature: string = '';
  @Input() transaction: Partial<TransactionDetails> = {};
  @Input() checkoutOptions: Partial<CheckoutOptions> = {};
  @Output() onSuccess = new EventEmitter<void>();
  @Output() onClose = new EventEmitter<void>();
  @Output() onPopup = new EventEmitter<any>();
  private _checkoutOptions: Partial<PrivateCheckoutOptions> = {};
  private isPaying = false;

  constructor(private ngxCheckoutBnplService: NgxCheckoutBnplService) {}

  async pay() {
    let errorText = '';
    if (this.checkoutOptions && Object.keys(this.checkoutOptions).length >= 2) {
      errorText = this.valdateInput(this.checkoutOptions);
      this.generateOptions(this.checkoutOptions);
    } else {
      errorText = this.valdateInput(this as Partial<CheckoutOptions>);
      this.generateOptions(this as Partial<CheckoutOptions>);
    }
    if (errorText) {
      console.error(errorText);
      return errorText;
    }
    await this.ngxCheckoutBnplService.loadScript();
    if (this.isPaying) {
      return;
    }
    this._checkoutOptions.onPopup = (...response) => {
      this.onPopup.emit(...response);
    };
    const connect = window.Connect(this._checkoutOptions);
    connect.setup();
    connect.open();
    this.isPaying = true;
    return '';
  }

  valdateInput(obj: Partial<CheckoutOptions>) {
    if (!this.onSuccess.observers.length) {
      return "NGX-CHECKOUT-BNPL: Insert a callback output like so (onSuccess)='PaymentComplete($event)' to check trasaction status";
    }
    return this.ngxCheckoutBnplService.checkInput(obj);
  }

  generateOptions(obj: Partial<CheckoutOptions>) {
    this._checkoutOptions = this.ngxCheckoutBnplService.getCheckoutOptions(
      obj as CheckoutOptions
    );
    this._checkoutOptions.onClose = () => {
      if (this.onClose.observers.length) {
        this.isPaying = false;
        this.onClose.emit();
      }
    };
    this._checkoutOptions.onSuccess = () => {
      this.isPaying = false;
      this.onSuccess.emit();
    };
  }

  @HostListener('click')
  async buttonClick() {
    this.pay();
  }
}
