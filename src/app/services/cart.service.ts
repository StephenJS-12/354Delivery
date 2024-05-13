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
  
  constructor() {
    this.loadPastOrders(); 
  }

  addToCart(item: CartItem) {
    console.log("Adding Item: ", item);
    const existingItem = this.cart.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 0) + (item.quantity || 1);
    } else {
      this.cart.push({...item, quantity: item.quantity || 1});
    }
  }

  getCartItems(): CartItem[] {
    return this.cart;
  }

  removeItem(index: number): void {
    this.cart.splice(index, 1);
  }

  private pastOrders: any[] = [];

  saveOrder() {
    if (this.cart.length > 0) {
      const orderDetails = {
        items: this.cart.map(item => ({...item})),  
        orderTotal: this.cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0),
        restaurant: this.cart[0].name,
      };
  
      this.pastOrders.push(orderDetails);
      localStorage.setItem('pastOrders', JSON.stringify(this.pastOrders));
      this.cart = [];
    }
  }
  

  loadPastOrders() {
    this.pastOrders = JSON.parse(localStorage.getItem('pastOrders') || '[]');
  }

  getPastOrders() {
    return this.pastOrders;
  }
}
