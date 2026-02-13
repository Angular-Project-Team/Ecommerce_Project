import { Component, signal, inject, computed } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCcVisa, faCcMastercard, faCcAmex } from '@fortawesome/free-brands-svg-icons';
import { faPlus, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { SavedPaymentService } from '../../../../core/services/saved-payment-sevice';
import { Payment } from '../../../../core/models/user.model';
import { PaymentItem } from './components/payment-item/payment-item';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

function expiryDateValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) return null;

  const [month, year] = value.split('/').map(Number);
  const expiry = new Date(2000 + year, month);
  const now = new Date();

  return expiry <= now ? { expired: true } : null;
}

@Component({
  standalone: true,
  selector: 'app-saved-payment',
  imports: [FontAwesomeModule, PaymentItem, ReactiveFormsModule],
  templateUrl: './saved-payment.html',
  styleUrls: ['./saved-payment.css'],
})
export class SavedPayment {
  faCcVisa = faCcVisa;
  faCcMastercard = faCcMastercard;
  faCcAmex = faCcAmex;
  faPlus = faPlus;
  faTriangleExclamation = faTriangleExclamation;

  savedPaymentService = inject(SavedPaymentService);

  userId = '1';
  payments = signal<Payment[]>([]);

  showForm = signal(false);
  editingPayment = signal<Payment | null>(null);
  isEditMode = computed(() => this.editingPayment() !== null);

  showDeleteConfirm = signal(false);
  paymentToDelete = signal<Payment | null>(null);

  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);
  isSubmitting = signal(false);

  paymentForm = new FormGroup({
    cardNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{4}$/),
    ]),
    expiryDate: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/),
      expiryDateValidator,
    ]),
    cardholderName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(/^[a-zA-Z\s'-]+$/),
    ]),
    cardType: new FormControl<'visa' | 'mastercard' | 'amex'>('visa', [Validators.required]),
    isDefault: new FormControl(false),
  });

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.savedPaymentService.getSavedPayments(this.userId).subscribe({
      next: (payments) => this.payments.set(payments as Payment[]),
      error: () => this.showError('Failed to load payment methods'),
    });
  }

  formatExpiryDate(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    input.value = value;
    this.paymentForm.get('expiryDate')?.setValue(value);
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.paymentForm.get(fieldName);
    return !!(control && control.invalid && control.touched);
  }

  getErrorMessage(fieldName: string): string {
    const control = this.paymentForm.get(fieldName);
    if (!control || !control.errors) return '';

    if (control.hasError('required')) return 'This field is required';
    if (control.hasError('minlength')) {
      const min = control.errors['minlength'].requiredLength;
      return `Minimum ${min} characters required`;
    }
    if (control.hasError('pattern')) {
      switch (fieldName) {
        case 'cardNumber': return 'Please enter the last 4 digits of your card';
        case 'expiryDate': return 'Please enter a valid date (MM/YY)';
        case 'cardholderName': return 'Please enter a valid name (letters only)';
      }
    }
    if (control.hasError('expired')) return 'This card has expired';
    return 'Invalid input';
  }

  openAddForm(): void {
    this.editingPayment.set(null);
    this.paymentForm.reset({ cardType: 'visa', isDefault: false });

    if (this.payments().length === 0) {
      this.paymentForm.patchValue({ isDefault: true });
    }

    this.showForm.set(true);
    this.clearMessages();
  }

  openEditForm(payment: Payment): void {
    this.editingPayment.set(payment);
    this.paymentForm.patchValue({
      cardNumber: payment.cardNumber,
      expiryDate: payment.expiryDate,
      cardholderName: payment.cardholderName,
      cardType: payment.cardType,
      isDefault: payment.isDefault,
    });
    this.showForm.set(true);
    this.clearMessages();
  }

  cancelForm(): void {
    this.showForm.set(false);
    this.editingPayment.set(null);
    this.paymentForm.reset();
    this.clearMessages();
  }

  submitForm(): void {
    this.paymentForm.markAllAsTouched();
    if (this.paymentForm.invalid || this.isSubmitting()) return;

    this.isSubmitting.set(true);
    const formValue = this.paymentForm.value;
    const last4 = (formValue.cardNumber || '').slice(-4);

    if (this.isEditMode()) {
      this.handleUpdate(last4, formValue);
    } else {
      this.handleAdd(last4, formValue);
    }
  }

  private async handleAdd(last4: string, formValue: any): Promise<void> {
    const shouldBeDefault = formValue.isDefault || this.payments().length === 0;

    const newPayment: Payment = {
      id: '',
      userId: this.userId,
      cardType: formValue.cardType,
      cardNumber: last4,
      expiryDate: formValue.expiryDate,
      cardholderName: formValue.cardholderName,
      isDefault: shouldBeDefault,
    };

    try {
      if (shouldBeDefault) await this.unsetAllDefaults();

      await firstValueFrom(this.savedPaymentService.addPayment(newPayment));
      this.loadPayments();
      this.closeFormAndReset();
      this.showSuccess('Payment method added successfully!');
    } catch {
      this.showError('Failed to add payment method. Please try again.');
    } finally {
      this.isSubmitting.set(false);
    }
  }

  private async handleUpdate(last4: string, formValue: any): Promise<void> {
    const existing = this.editingPayment()!;
    const updatedPayment: Payment = {
      ...existing,
      cardType: formValue.cardType,
      cardNumber: last4,
      expiryDate: formValue.expiryDate,
      cardholderName: formValue.cardholderName,
      isDefault: formValue.isDefault ?? existing.isDefault,
    };

    try {
      if (updatedPayment.isDefault && !existing.isDefault) {
        await this.unsetAllDefaults();
      }

      if (!updatedPayment.isDefault && existing.isDefault && this.payments().length === 1) {
        updatedPayment.isDefault = true;
      }

      await firstValueFrom(this.savedPaymentService.updatePayment(updatedPayment));
      this.loadPayments();
      this.closeFormAndReset();
      this.showSuccess('Payment method updated successfully!');
    } catch {
      this.showError('Failed to update payment method. Please try again.');
    } finally {
      this.isSubmitting.set(false);
    }
  }

  async setAsDefault(payment: Payment): Promise<void> {
    try {
      await this.unsetAllDefaults();
      await firstValueFrom(
        this.savedPaymentService.updatePayment({ ...payment, isDefault: true })
      );
      this.loadPayments();
      this.showSuccess(`Card ending in ${payment.cardNumber} set as default`);
    } catch {
      this.showError('Failed to set default payment method');
    }
  }

  confirmDelete(payment: Payment): void {
    this.paymentToDelete.set(payment);
    this.showDeleteConfirm.set(true);
  }

  cancelDelete(): void {
    this.paymentToDelete.set(null);
    this.showDeleteConfirm.set(false);
  }

  async executeDelete(): Promise<void> {
    const payment = this.paymentToDelete();
    if (!payment) return;

    try {
      await firstValueFrom(this.savedPaymentService.deletePayment(payment.id));

      const remaining = this.payments().filter(p => p.id !== payment.id);
      if (payment.isDefault && remaining.length > 0) {
        await firstValueFrom(
          this.savedPaymentService.updatePayment({ ...remaining[0], isDefault: true })
        );
      }

      this.loadPayments();
      this.showDeleteConfirm.set(false);
      this.paymentToDelete.set(null);

      if (this.editingPayment()?.id === payment.id) {
        this.closeFormAndReset();
      }

      this.showSuccess('Payment method deleted successfully!');
    } catch {
      this.showDeleteConfirm.set(false);
      this.showError('Failed to delete payment method. Please try again.');
    }
  }

  private async unsetAllDefaults(): Promise<void> {
    const defaults = this.payments().filter(p => p.isDefault);
    for (const p of defaults) {
      await firstValueFrom(
        this.savedPaymentService.updatePayment({ ...p, isDefault: false })
      );
    }
  }

  private closeFormAndReset(): void {
    this.showForm.set(false);
    this.editingPayment.set(null);
    this.paymentForm.reset();
  }

  private showSuccess(message: string): void {
    this.successMessage.set(message);
    this.errorMessage.set(null);
    setTimeout(() => this.successMessage.set(null), 5000);
  }

  private showError(message: string): void {
    this.errorMessage.set(message);
    this.successMessage.set(null);
    setTimeout(() => this.errorMessage.set(null), 5000);
  }

  private clearMessages(): void {
    this.successMessage.set(null);
    this.errorMessage.set(null);
  }
}
