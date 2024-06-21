import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  CheckoutOptions,
  NgxCheckoutBnplDirective,
  Product,
  TransactionDetails,
} from 'NgxCheckoutBnpl';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'ang-bnpl-root',
  standalone: true,
  imports: [RouterOutlet, NgxCheckoutBnplDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Angular-Checkout-Library';
  products: Product[] = [
    {
      productAmount: 500,
      productName: 'Iphone 20s Pro',
      productId: 'EG3451',
    },
    {
      productAmount: 800,
      productName: 'Iphone 18s ProMax',
      productId: 3535,
    },
  ];
  transaction: TransactionDetails = {
    totalAmount: 1300,
    customerEmail: 'test@gmail.com',
    customerPhone: '01234567898',
    products: this.products,
    sessionId: this.generateUniqueSessionId(15),
  };
  options: CheckoutOptions = {
    publicKey: '',
    isLive: false,
    signature: this.signTransaction(this.transaction),
    transaction: this.transaction,
  };

  constructor() {
    console.log(this.options);
  }

  generateUniqueSessionId(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  onPopUpClose(): void {}
  onPopUpOpen(event: any): void {
    console.log(event);
  }
  onSuccess(): void {}

  signTransaction(transaction: TransactionDetails) {
    const pk = '';
    const sm =
      transaction.sessionId +
      transaction.customerEmail +
      transaction.totalAmount;
    const st = this.signTransactionRequest(sm, pk);
    return st;
  }

  signTransactionRequest(message: string, pk: string) {
    const key = CryptoJS.enc.Utf8.parse(pk);
    const messageData = CryptoJS.enc.Utf8.parse(message);
    const signature = CryptoJS.enc.Hex.stringify(
      CryptoJS.HmacSHA256(messageData, key)
    );
    return signature;
  }
}
