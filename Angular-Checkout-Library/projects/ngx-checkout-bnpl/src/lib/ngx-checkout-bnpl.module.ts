import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxCheckoutBnplComponent } from './ngx-checkout-bnpl.component';
import { NgxCheckoutBnplService } from './ngx-checkout-bnpl.service';
import { PUBLIC_KEY_TOKEN } from './checkout-token';
import { NgxCheckoutBnplDirective } from './ngx-checkout-bnpl.directive';

@NgModule({
  imports: [CommonModule, NgxCheckoutBnplComponent, NgxCheckoutBnplDirective],
  exports: [NgxCheckoutBnplComponent, NgxCheckoutBnplDirective],
  providers: [],
})
export class NgxCheckoutBnplModule {
  static forRoot(token: string): ModuleWithProviders<NgxCheckoutBnplModule> {
    return {
      ngModule: NgxCheckoutBnplModule,
      providers: [
        NgxCheckoutBnplService,
        { provide: PUBLIC_KEY_TOKEN, useValue: token },
      ],
    };
  }
}
