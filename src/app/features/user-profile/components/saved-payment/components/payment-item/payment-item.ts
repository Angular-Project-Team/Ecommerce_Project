import { Component, input, output } from '@angular/core';
import { Payment } from '../../../../../../core/models/user.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCcVisa, faCcMastercard, faCcAmex } from '@fortawesome/free-brands-svg-icons';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-payment-item',
  imports: [FontAwesomeModule],
  templateUrl: './payment-item.html',
  styleUrls: ['./payment-item.css'],
  host: { class: 'block' }
})
export class PaymentItem {
  faCcVisa = faCcVisa;
  faCcMastercard = faCcMastercard;
  faCcAmex = faCcAmex;
  faCheck = faCheck;
  faPenToSquare = faPenToSquare;
  faXmark = faXmark;

  payment = input<Payment>();

  edit = output<Payment>();
  delete = output<Payment>();
  setDefault = output<Payment>();

  onEdit(): void {
    this.edit.emit(this.payment()!);
  }

  onDelete(): void {
    this.delete.emit(this.payment()!);
  }

  onSetDefault(): void {
    this.setDefault.emit(this.payment()!);
  }
}
