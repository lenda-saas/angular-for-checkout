import { EventEmitter } from '@angular/core';

export interface CheckoutOptions {
  /**
   * Your pubic Key from portal.
   */
  publicKey?: string;
  /**
   * toggle between test or live mode.
   */
  isLive: boolean;
  /**
   * Signed message from your server using your private key and transaction details.
   */
  signature: string;
  /**
   * Transaction details object
   */
  transaction: TransactionDetails;
}

export interface PrivateCheckoutOptions extends CheckoutOptions {
  /**
   * A function to be called on successful loan creation. 
   */
  onSuccess: () => void;
  /**
   * A function to be called when the pay modal is closed.
   */
  onClose: () => void;
  /**
   * A function to be called when payment is about to begin.
   * It emits checkout transaction Id
   * @param response?: The server response
   */
  onPopup: (response?: any) => void;
}

export interface PrivateCheckoutOptionsWithEmitters extends CheckoutOptions {
  /**
   * A function to be called on successful loan creation.
   */
  onSuccess: EventEmitter<void>;
  /**
   * A function to be called when the pay modal is closed.
   */
  onClose: EventEmitter<void>;
  /**
   * A function to be called when payment is about to begin.
   * It emits checkout transaction Id
   */
  onPopup: EventEmitter<any>;
}

export interface TransactionDetails {
    /**
     * Total amount of transaction
     */
    totalAmount: number;
    /**
     * Customer email address
     */
    customerEmail: string;
    /**
     * Customer phone number with or without country code
     */
    customerPhone: string;
    /**
     * Randomised session Id, eg GUID/UUID
     */
    sessionId: string;
    /**
     * List of all product(s) purchased
     */
    products: Product[]
}

export interface Product {
    /**
     * Full name of the product purchased
     */
    productName: string;
    /**
     * Amount of the product purchased
     */
    productAmount: number;
    /**
     * Product ID or SKU
     */
    productId: string | number;
}