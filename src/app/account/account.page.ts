import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditUserDetailsModalComponent } from '../edit-user-details-modal/edit-user-details-modal.component';
import { CartService } from '../services/cart.service';
import { CartItem } from '../services/cart.service';
import { HelpModalComponent } from '../help-modal/help-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  pastOrders: any[] = [];
  userDetails: any = {
    name: 'John Jones',
    phone: '031 402 3352',
    email: 'John.Jones@newemailwhodis.ac.za'
  };

  constructor(  
    private modalCtrl: ModalController,
    private cartService: CartService,
    private router: Router) { }

  async editDetails() {
    const modal = await this.modalCtrl.create({
      component: EditUserDetailsModalComponent,
      componentProps: { userDetails: this.userDetails }
    });
    await modal.present();
  
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.userDetails = data;
      console.log("Updated user details: ", this.userDetails)
    }
  }

  reorder(order: any) {
    if (order && Array.isArray(order.items)) {
      order.items.forEach((item: CartItem) => {
        this.cartService.addToCart(item);
      });
      console.log('Order has been added to cart again');
      this.router.navigate(['/cart']); 
    } else {
      console.error('Order items are undefined or not an array');
    }
  }

  async getHelp(order: any) {
    const modal = await this.modalCtrl.create({
      component: HelpModalComponent, 
      componentProps: { order: order }
    });
    await modal.present();
  }

  openManageAddresses() {
   
  }

  loadPastOrders() {
    this.pastOrders = this.cartService.getPastOrders();
  }

  ngOnInit() {
    this.loadPastOrders();
  }

}
