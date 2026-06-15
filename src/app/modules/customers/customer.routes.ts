import {Routes } from '@angular/router';
import { CustomerContactComponent } from './customer-contact/customer-contact.component';  
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerSiteComponent } from './customer-site/customer-site.component';

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
    }
];