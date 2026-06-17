import {Routes } from '@angular/router';
import { CustomerContactComponent } from './customer-contact/customer-contact.component';  
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerSiteComponent } from './customer-site/customer-site.component';
import { CustomerDetailLayoutComponent } from './customer-detail/customer-detail-layout.component';
import { CustomerInfoTabComponent } from './customer-detail/customer-info-tab/customer-info-tab.component';
import { CustomerContactsTabComponent } from './customer-detail/customer-contacts-tab/customer-contacts-tab.component';
import { CustomerSitesTabComponent } from './customer-detail/customer-sites-tab/customer-sites-tab.component';

export const CUSTOMERS_ROUTES: Routes = [
    {
        path: 'list',
        component: CustomerListComponent,
    },
    {
        path: 'sites',
        component: CustomerSiteComponent,
    },
    { 
        path: 'contacts',
        component: CustomerContactComponent,
    },
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