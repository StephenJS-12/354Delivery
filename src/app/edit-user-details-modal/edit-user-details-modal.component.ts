import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-user-details-modal',
  templateUrl: './edit-user-details-modal.component.html',
  styleUrls: ['./edit-user-details-modal.component.scss'],
})
export class EditUserDetailsModalComponent  implements OnInit {
  @Input() userDetails: any;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  dismissModal() {
    this.modalController.dismiss();
  }

  saveDetails() {
    this.modalController.dismiss(this.userDetails);
  }
}
