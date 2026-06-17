import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAnchor } from "@angular/material/button";
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomerService } from './customer.service';
import { CustomerDTO } from '../DTOs/customerDTO';
import {MatDialog, MatDialogModule} from '@angular/material/dialog'
import { CreateCustomerDialogComponent } from './dialogs/create-customer-dialog/create-customer-dialog.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customer-list.component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatInputModule, CdkScrollable, MatPaginatorModule, MatAnchor, MatTooltipModule, MatProgressSpinnerModule, MatDialogModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css',
})
export class CustomerListComponent implements OnInit {

  customers = signal<CustomerDTO[]>([]);
  isLoading = signal<boolean>(false);
  private readonly customerService = inject(CustomerService);
  private readonly dialog = inject(MatDialog)
  private router = inject(Router);


  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.isLoading.set(true);

    this.customerService.fetchCustomers().subscribe({
      next: (data: CustomerDTO[]) => {
        this.customers.set(data);
        this.isLoading.set(false);
        console.log(this.customers().length)
      },
      error: (err) =>{
        console.error('Failed to resolve customer data context', err);
        this.isLoading.set(false);
      }
    })
  }

  showCustomerDetail(customer: CustomerDTO): void {
    this.router.navigate(['apps/customers', customer.id])
  }

  openCreateCustomerDialog(): void {
    const dialogRef = this.dialog.open(CreateCustomerDialogComponent, {
      width: '600px',
      disableClose: false
    })
    dialogRef.afterClosed().subscribe((result: CustomerDTO | null) => {
      if (result) {
        console.log("New Customer Object Data Received: ", result);
        
        // Use loadCustomer() to safely downlaond customers including the new customer inside the signal array stream
        this.loadCustomers();
      }
    });
  }
}
