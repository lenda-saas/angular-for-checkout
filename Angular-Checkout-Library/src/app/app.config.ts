import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { NgxCheckoutBnplModule } from '../../projects/ngx-checkout-bnpl/src/public-api';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(NgxCheckoutBnplModule.forRoot(''))]
};
