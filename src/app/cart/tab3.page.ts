import { Component } from '@angular/core';
import { CartService, CartItem } from '../services/cart.service';
import { ToastController } from '@ionic/angular';
import { max, min } from 'rxjs';

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
    return this.cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0); 
  }
  
  totalPay() {
    return this.itemTotal() + 50; 
  }

  randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async makePayment() {
    const rndInt = this.randomInt(1, 10);
    if (rndInt == 6){
      const toast = await this.toastController.create({
        message: 'Payment failed',
        duration: 2000
      });
      toast.present();
    } else {
      const toast = await this.toastController.create({
        message: 'Payment was successful',
        duration: 2000
      });
      toast.present();
  
      this.cartService.saveOrder();
  
      this.updateCartDisplay();
    }
    console.log(rndInt);
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
    this.cartItems = this.cartService.getCartItems(); 
  }

  updateCartDisplay(): void {
    this.cartItems = this.cartService.getCartItems(); 
  }
  
}

