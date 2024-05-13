import { Injectable } from '@angular/core';

export interface Restaurant {
  name: string;
  dish: string;
  type: string;
  rating: number;
  distance: number;
  price: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private restaurants: Restaurant[] = [
    {
      name: 'Joll of Africa',
      dish: 'Top Dish: A5 Wagyu Beef Steak',
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

  constructor() { }

  getRestaurants(): Restaurant[] {
    return this.restaurants;
  }
}
