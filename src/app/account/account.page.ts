import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditUserDetailsModalComponent } from '../edit-user-details-modal/edit-user-details-modal.component';
import { CartService } from '../services/cart.service';
import { CartItem } from '../services/cart.service';
import { HelpModalComponent } from '../help-modal/help-modal.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  pastOrders = [
    { description: 'Jollof of Africa - R200', id: 1 },
    { description: 'Jollof x 2 - March 31, 2023 10:00 AM', id: 2 }
  ];
  userDetails: any = {
    name: 'John Jones',
    phone: '031 402 3352',
    email: 'John.Jones@newemailwhodis.ac.za'
  };

  constructor(  
    private modalCtrl: ModalController,
    private cartService: CartService) { }

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

  async reorder(order: any) {
      order.items.forEach((item: CartItem) => {
        this.cartService.addToCart(item);
      });
    console.log('Order has been added to cart again');
  }

  async getHelp(order: any) {
    const modal = await this.modalCtrl.create({
      component: HelpModalComponent, // You need to create this component
      componentProps: { order: order }
    });
    await modal.present();
  }

  openManageAddresses() {
    // This is just for display, no functionality needed
  }

  ngOnInit() {
  }

}
