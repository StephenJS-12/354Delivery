import { Component } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { CartService } from '../services/cart.service';
import { RestaurantService, Restaurant } from '../services/restaurant.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  searchQuery = '';
  restaurants: Restaurant[] = []; 
  filteredRestaurants: Restaurant[] = [];

  constructor(
    private restaurantService: RestaurantService,
    private cartService: CartService,  
    private toastController: ToastController,
    private alertController: AlertController) {
  }

  ngOnInit() {
    this.restaurants = this.restaurantService.getRestaurants();
  }

  onSearchChange() {
    console.log('Search Query:', this.searchQuery);  // Log the current query
    this.filteredRestaurants = this.searchQuery.trim() ? this.restaurants.filter(restaurant => {
      const searchLower = this.searchQuery.toLowerCase();
      return restaurant.name.toLowerCase().includes(searchLower) ||
             restaurant.dish.toLowerCase().includes(searchLower) ||
             restaurant.type.toLowerCase().includes(searchLower) ||
             restaurant.rating.toString().includes(this.searchQuery) ||
             restaurant.price.toString().includes(this.searchQuery) ||
             restaurant.distance.toString().includes(this.searchQuery);
    }) : [];
  }

  async showNotification(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000  // Adjust duration as necessary
    });
    await toast.present();
  }

  
  addToCart(restaurant: Restaurant) {
    console.log("Adding Item: ", restaurant);
    const cartItem = { name: restaurant.name, price: restaurant.price, quantity: 1, image: restaurant.image}; 
    this.cartService.addToCart(cartItem); // Call to CartService
    this.showNotification(`${restaurant.name} added to cart`); // Optional: Display a toast notification
}
}
