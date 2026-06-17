import { CommonModule } from '@angular/common';
import { Component, DestroyRef, Inject, inject, OnInit, signal } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CreateCustomerRequest } from '../../../contracts/createCustomerRequest';
import { CustomerService } from '../../customer.service';


// Define explicit strict typings for our form properties to maintain type safety across the template
type CustomerForm = FormGroup<{
  legalName: FormControl<string>;
  displayName: FormControl<string>;
  taxIdentifier: FormControl<string>;
  industry: FormControl<string>;
  notes: FormControl<string>;
}>;

@Component({
  selector: 'app-create-customer-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './create-customer-dialog.component.html',
})

export class CreateCustomerDialogComponent implements OnInit{

  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly customerService = inject(CustomerService);

  // Signal state to handle template-level loader indicators gracefully during API submission calls
  isSubmitting = signal<boolean>(false);

  readonly customerForm: CustomerForm = this.fb.group({
    legalName: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
    displayName: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
    taxIdentifier: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    industry: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    notes: this.fb.nonNullable.control('', [Validators.required, Validators.maxLength(2000)]), 
  }) as CustomerForm;

  constructor(
    public dialogRef: MatDialogRef<CreateCustomerDialogComponent>
  ){}

  ngOnInit(): void {}

  /**
   * Triggers when the user presses 'Save' or fires the form submit handler
   */
  submitForm(): void {
    // Stop immediately if a user bypasses native HTML validation states
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    // Extract values safely from our nonNullable Form Controls
    const formValue = this.customerForm.getRawValue();

    // Prepare payload adding fallback keys matching our CustomerDTO requirements
    const customerPayload: CreateCustomerRequest = {
      ...formValue,
    }

    this.customerService.createCustomer(customerPayload).subscribe({
      next: (savedCustomerEntity) => {
        this.isSubmitting.set(false);
        if (savedCustomerEntity) {
          // Pass the database entity back up to our customer list table view
          this.dialogRef.close(savedCustomerEntity);
        }
      },
      error: (err) => {
        console.error('Submission transaction broken', err);
        this.isSubmitting.set(false);
      }
    });
  }

  /**
   * Dismisses the dialog window immediately without tracking mutations
   */
  cancel(): void {
    this.dialogRef.close(null);
  }

}
