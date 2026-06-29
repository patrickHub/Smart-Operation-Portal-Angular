import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CustomerSiteDTO } from '../../DTOs/customerSiteDTO';
import { CustomerService } from '../../customer-list/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SiteActionDialogComponent } from '../dialogs/site-action-dialog/site-action-dialog.component';

@Component({
  selector: 'app-customer-sites-tab.component',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './customer-sites-tab.component.html',
  styleUrl: './customer-sites-tab.component.css',
})
export class CustomerSitesTabComponent implements OnInit {
  customerId = input.required<string>();
  customerSites = signal<CustomerSiteDTO[]>([]);
  isLoading = signal<boolean>(false);
  private readonly customerService = inject(CustomerService);
  private readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadCustomerSites();
  }

  loadCustomerSites(): void {

    this.isLoading.set(true);

    this.customerService.fetchCustomerSites(this.customerId()).subscribe({
      next: (data: CustomerSiteDTO[]) => {
        if(data){
          this.isLoading.set(false);
          this.customerSites.set(data);
        }
      },
      error: (err) =>{
        console.log("Error loading customer site from customer Id: " + this.customerId());
        this.isLoading.set(false);
      }
    })
    
  }

  /** Opens dialog in 'CREATE' mode */
  openAddSiteDialog(): void {
    const dialogRef = this.dialog.open(SiteActionDialogComponent, {
      width: '650px',
      disableClose: true,
      data: { mode: 'CREATE', customerId: this.customerId() }
    });

    dialogRef.afterClosed().subscribe((newSite: CustomerSiteDTO) => {
      if (newSite) {
        this.loadCustomerSites();
      }
    });
  }

  /** Opens dialog in 'VIEW' mode when a user clicks a row item */
  openRowDetailDialog(site: CustomerSiteDTO): void {
    const dialogRef = this.dialog.open(SiteActionDialogComponent, {
      width: '650px',
      disableClose: true,
      data: { mode: 'VIEW', 'customerSite': site }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      
      if (result.action === 'DELETED') {
        // Remove from UI array signal
        this.customerSites.update(current => current.filter(s => s.id !== result.id));
      } else if (result.action === 'UPDATED') {
        // Replace outdated row object inside array signal
        this.customerSites.update(current => current.map(s => s.id === result.site.id ? result.site : s));
      }
    });
  }

}
