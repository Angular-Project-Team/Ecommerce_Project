import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCcVisa, faCcMastercard } from '@fortawesome/free-brands-svg-icons';
import { faPlus, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-saved-payment',
  imports: [FontAwesomeModule],
  templateUrl: './saved-payment.html',
  styleUrl: './saved-payment.css',
})
export class SavedPayment {
  faPenToSquare = faPenToSquare;
  faXmark = faXmark;
  faCcVisa = faCcVisa;
  faCcMastercard = faCcMastercard;
  faPlus = faPlus;
  faCheck = faCheck;
}
