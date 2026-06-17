import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { CustomerService } from '../customer-list/customer.service';
import { CustomerDTO } from '../DTOs/customerDTO';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-customer-detail-layout.component',
  standalone: true,
  imports: [RouterOutlet, MatIcon, CommonModule, 
    MatTabsModule, 
    MatIconModule, 
    RouterLink, 
    RouterLinkActive, 
    RouterOutlet,
    MatProgressSpinnerModule],
  templateUrl: './customer-detail-layout.component.html',
  styleUrl: './customer-detail-layout.component.css',
})
export class CustomerDetailLayoutComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private customerService = inject(CustomerService);
  customerId = signal<string>('');
  customer = signal<CustomerDTO | undefined>(undefined);
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.isLoading.set(true);
    const id = this.route.snapshot.params['customerId'];
    console.log("Customer Id: " + id);
    if (id){
      this.customerId.set(id);
      console.log("customer Id 2: " + this.customerId());
    }
    this.loadCustpmerInfo();
  }

  loadCustpmerInfo(): void {
      this.customerService.getCustomerById(this.customerId()).subscribe({
        next: (data: CustomerDTO) => {
          this.isLoading.set(false);
          this.customer.set(data);
          console.log(this.customer())
        },
        error: (err) =>{
          console.error('Failed to load customer by Id info', err);
        }
      })
    }

    // Triggers automatically whenever a tab switches and mounts a sub-component
    onTabActivated(componentRef: any): void {
      // if the loaded sub-component has a property matching our input expectations, feed it!
      if(componentRef && 'customer' in componentRef && this.customer()){
        // then write the signal object straight down into the sub-component reference parameter
        componentRef.customer = this.customer;
      }
    }

  
}
