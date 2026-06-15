import { Routes } from "@angular/router";
import { InvoiceComponent } from "./invoice/invoice.component"; 
import { PricingPolicyComponent } from "./pricing-policy/pricing-policy.component";


export const BILLING_ROUTES: Routes = [
    {
        path: 'invoices',
        component: InvoiceComponent,
    },
    {
        path: 'pricing-policies',
        component: PricingPolicyComponent, 
    },
];