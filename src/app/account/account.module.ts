import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AccountPageRoutingModule } from './account-routing.module';

import { AccountPage } from './account.page';
import { EditUserDetailsModalComponent } from '../edit-user-details-modal/edit-user-details-modal.component';
import { HelpModalComponent } from '../help-modal/help-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountPageRoutingModule
  ],
  declarations: [AccountPage, EditUserDetailsModalComponent, HelpModalComponent]
})
export class AccountPageModule {}
