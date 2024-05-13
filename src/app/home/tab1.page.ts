import { Component } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { CartService } from '../services/cart.service';

interface Restaurant {
  name: string;
  dish: string;
  type: string;
  rating: number;
  distance: number;
  price: number;
  image: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  restaurants: Restaurant[] = [
    {
      name: 'Jollof of Africa',
      dish: 'Top Dish: Jollof Rice',
      type: 'African',
      rating: 5,
      distance: 2.36,
      price: 150,
      image: './assets/jollof.jpg'
    },
    {
      name: 'Napoli Pasta Bar',
      dish: 'Top Dish: Spaghetti Carbonara',
      type: 'Italian',
      rating: 4.8,
      distance: 3.5,
      price: 120,
      image: './assets/napoli-pasta.jpg'
    },
    {
      name: 'Sushi Maki Mania',
      dish: 'Top Dish: Salmon Nigiri',
      type: 'Japanese',
      rating: 4.5,
      distance: 1.8,
      price: 180,
      image: './assets/sushi-maki.jpg'
    },
    {
      name: 'Curry in a Hurry',
      dish: 'Top Dish: Chicken Tikka Masala',
      type: 'Indian',
      rating: 4.7,
      distance: 4.0,
      price: 160,
      image: './assets/curry-hurry.jpg'
    }    
  ];

  constructor(
    private cartService: CartService, 
    private toastController: ToastController,
    private alertController: AlertController  
  ) {}

  async addToCart(restaurant: Restaurant) {
    console.log("Clicked restaurant", restaurant);
    
    const alert = await this.alertController.create({
      header: 'Add to Cart',
      message: 'Enter quantity:',
      inputs: [
        {
          name: 'quantity',
          type: 'number',
          min: 1,
          placeholder: 'Quantity'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Order canceled');
          }
        },
        {
          text: 'Ok',
          handler: (data) => {
            if (data.quantity && parseInt(data.quantity) > 0) {
              this.confirmOrder(restaurant, parseInt(data.quantity));
              return true;  
            } else {
              return false; 
            }
          } 
        }
      ]
    });

    await alert.present();
  }

  async confirmOrder(restaurant: Restaurant, quantity: number) {
    const confirmAlert = await this.alertController.create({
      header: 'Confirm Order',
      message: `Place order for ${quantity} x ${restaurant.name}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Place Order',
          handler: () => {
            this.cartService.addToCart({ 
              name: restaurant.name, 
              price: restaurant.price, 
              quantity: quantity,
              image: restaurant.image
            });
            this.showNotification('Order placed');
          }
        }
      ]
    });

    await confirmAlert.present();
  }

  async showNotification(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    await toast.present();
  }

  saveToLocalStorage() {
    localStorage.setItem('restaurants', JSON.stringify(this.restaurants));
  }

  loadFromLocalStorage() {
    const data = localStorage.getItem('restaurants');
    if (data) {
      this.restaurants = JSON.parse(data);
    }
  }
}
