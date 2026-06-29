import { Component, Inject, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from '../../../customer-list/customer.service';
import { CustomerSiteDTO } from '../../../DTOs/customerSiteDTO';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-site-action-dialog',
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule, MatIconModule, MatInputModule],
  templateUrl: './site-action-dialog.component.html',
  styleUrl: './site-action-dialog.component.css',
})
export class SiteActionDialogComponent {

  private readonly fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<SiteActionDialogComponent>);
  private customerService = inject(CustomerService);

  currentMode = signal<'CREATE' | 'VIEW' | 'EDIT' | 'CONFIRM_DELETE'>('VIEW');
  isProcessing = signal<boolean>(false);

  // Capture injected dynamic parameters from row click event triggers
  constructor(@Inject(MAT_DIALOG_DATA) public injectedData: {mode: 'CREATE' | 'VIEW', customerId?: string, customerSite?: CustomerSiteDTO}){

    this.currentMode.set(injectedData.mode);
    if(injectedData.customerSite){
      // If a row payload is present, pre-fill control registers automatically
      this.siteForm.patchValue(injectedData.customerSite);
    }

  }

  siteForm = this.fb.group({
    siteName: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
    addressLine1: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
    addressLine2: this.fb.nonNullable.control(''),
    city: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    stateRegion: this.fb.nonNullable.control('', [Validators.required, Validators.maxLength(100)]),
    postalCode: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
    countryCode: this.fb.nonNullable.control('', [Validators.required]),
    timezone: this.fb.nonNullable.control('Europe/Zurich', [Validators.required]),
    accessInstructions: this.fb.nonNullable.control('')
  });

  createCustomerSite(): void{
    if(this.siteForm.invalid) return;

    this.isProcessing.set(true);
    const payload = this.siteForm.getRawValue();

    this.customerService.createCustomerSite(this.injectedData.customerId!, payload).subscribe({
      next: (savedSite) =>{
        this.isProcessing.set(false)
        this.dialogRef.close(savedSite);
        console.log("Creaate customer site: ", savedSite);
      },
      error: (err) => {
        this.isProcessing.set(false);
        console.error("Error create customer site from customer id: ", err);
      }
    })
  }

  updateExistingSite(): void {}
  confirmDeletionExecution(): void {}

  cancel(): void {
    this.dialogRef.close(null);
  }

}
