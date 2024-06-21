import { Inject, Injectable } from '@angular/core';
import { CheckoutOptions } from './checkout-options';
import { PUBLIC_KEY_TOKEN } from './checkout-token';

interface CurrentWindow extends Window {
  Connect: {
    (options: Partial<CheckoutOptions>): { setup(): any; open(): any };
  };
}
declare var window: CurrentWindow;

@Injectable({
  providedIn: 'root',
})
export class NgxCheckoutBnplService {
  constructor(@Inject(PUBLIC_KEY_TOKEN) private token: string) {}

  public loadScript(): Promise<void> {
    return new Promise((resolve) => {
      if (
        window.Connect &&
        typeof window.Connect === 'function'
      ) {
        resolve();
        return;
      }
      const script = window.document.createElement('script');
      window.document.head.appendChild(script);
      const onLoadFunc = () => {
        script.removeEventListener('load', onLoadFunc);
        resolve();
      };
      script.addEventListener('load', onLoadFunc);
      script.setAttribute(
        'src',
        'https://checkout.creditdirect.ng/bnpl/checkout.min.js'
      );
    });
  }

  checkInput(obj: Partial<CheckoutOptions>): string {
    if (!obj.publicKey && !this.token) {
      return 'NGX-CHECKOUT-BNPL: Please insert a your public key';
    }
    if (!obj.signature) {
      return 'NGX-CHECKOUT-BNPL: Checkout signature cannot be empty';
    }
    if (!obj.transaction) {
      return 'NGX-CHECKOUT-BNPL: Checkout transaction details cannot be empty';
    }
    if (!obj.transaction.customerEmail) {
      return 'NGX-CHECKOUT-BNPL: Checkout customer email in transaction details cannot be empty';
    }
    if (!obj.transaction.customerPhone) {
      return 'NGX-CHECKOUT-BNPL: Checkout customer phone number in transaction details cannot be empty';
    }
    if (!obj.transaction.totalAmount) {
      return 'NGX-CHECKOUT-BNPL: Checkout total transaction amount in transaction details cannot be empty';
    }
    if (!obj.transaction.sessionId) {
      return 'NGX-CHECKOUT-BNPL: Checkout session ID in transaction details cannot be empty';
    }
    if (!obj.transaction.products) {
      return 'NGX-CHECKOUT-BNPL: Checkout product list in transaction details cannot be empty';
    }
    obj.transaction.products.forEach((product) => {
      if (!product.productName) {
        return 'NGX-CHECKOUT-BNPL: One of the product name in the product list is empty';
      }
      if (!product.productAmount) {
        return 'NGX-CHECKOUT-BNPL: One of the product amount in the product list is empty';
      }
      if (!product.productId) {
        return 'NGX-CHECKOUT-BNPL: One of the product id in the product list is empty';
      } else {
        return '';
      }
    });
    return '';
  }

  getCheckoutOptions(obj: CheckoutOptions): CheckoutOptions {
    const checkoutOptions: CheckoutOptions = {
      publicKey: obj.publicKey || this.token,
      isLive: obj.isLive || false,
      signature: obj.signature,
      transaction: obj.transaction
    };
    return checkoutOptions;
  }
}
