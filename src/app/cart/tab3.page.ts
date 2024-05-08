import { Component } from '@angular/core';
import { CartService, CartItem } from '../services/cart.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  cartItems: CartItem[] = [];

  constructor(
    public cartService: CartService,
    public toastController: ToastController) 
    {this.cartItems = this.cartService.getCartItems();}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
  }

  itemTotal() {
    return this.cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0); // Default to 1 if quantity is undefined
  }
  
  totalPay() {
    return this.itemTotal() + 50; // Assuming delivery fee is R50
  }

  async makePayment() {
    const toast = await this.toastController.create({
      message: 'Payment was successful',
      duration: 2000
    });
    toast.present();
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
    this.cartItems = this.cartService.getCartItems(); // Refresh the list after removal
  }

  updateCartDisplay(): void {
    this.cartItems = this.cartService.getCartItems(); // Refresh the local copy in your component
  }
}

