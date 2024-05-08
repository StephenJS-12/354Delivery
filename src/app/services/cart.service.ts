import { Injectable } from '@angular/core';

export interface CartItem {
  name: string;
  quantity?: number;
  price: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItem[] = [];

  constructor() { }

  addToCart(item: CartItem) {
    console.log("Adding Item: ", item);
    
    const existingItem = this.cart.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
      // If existingItem's quantity is undefined, initialize it to 0 before incrementing
      existingItem.quantity = (existingItem.quantity || 0) + (item.quantity || 1);
    } else {
      // If the item does not exist in the cart, add it with a quantity of 1 if not specified
      this.cart.push({...item, quantity: item.quantity || 1});
    }
  }

  getCartItems(): CartItem[] {
    return this.cart;
  }

  removeItem(index: number): void {
    this.cart.splice(index, 1);
  }
}
