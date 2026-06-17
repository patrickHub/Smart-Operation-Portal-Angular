import {Routes } from '@angular/router';
import { CustomerDetailLayoutComponent } from './customer-detail-layout.component';
import { CustomerInfoTabComponent } from './customer-info-tab/customer-info-tab.component';
import { CustomerContactsTabComponent } from './customer-contacts-tab/customer-contacts-tab.component';
import { CustomerSitesTabComponent } from './customer-sites-tab/customer-sites-tab.component';

export const CUSTOMERS_DETAIL_ROUTES: Routes = [
    {
        path: ':customerId',
        component: CustomerDetailLayoutComponent,
        children: [
            {path: 'info', component: CustomerInfoTabComponent},
            {path: 'sites', component: CustomerSitesTabComponent},
            {path: 'contacts', component: CustomerContactsTabComponent},
            {path: '', redirectTo: 'info', pathMatch: 'full'}
        ]
    }
    
];