import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

export const routes: Routes = [

    {
    path: '',
    component: LayoutComponent,
    children: [
      // 1. Dashboard Routes
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },

      // 2. Customers Module
      {
        path: 'apps/customers',
        loadChildren: () => import('./modules/customers/customer.routes').then(m => m.CUSTOMERS_ROUTES),
      },

      // 3. Assets Module
      {
        path: 'apps/assets',
        loadChildren: () => import('./modules/assets/asset.routes').then(m => m.ASSET_ROUTES),
      },

      // 4. Billing Module
      {
        path: 'apps/billing',
        loadChildren: () => import('./modules/billing/billing.routes').then(m => m.BILLING_ROUTES),
      },

      // 5. Notifications Module
      {
        path: 'apps/notifications',
        loadChildren: () => import('./modules/notifications/notification.routes').then(m => m.NOTIFICATION_ROUTES),
      },

      // 6. System Module
      {
        path: 'apps/system',
        loadChildren: () => import('./modules/system/system.routes').then(m => m.SYSTEM_ROUTES),
      },

      // 7. Work Orders Module
      {
        path: 'apps/work-orders',
        loadChildren: () => import('./modules/workorders/workorder.routes').then(m => m.WORKORDER_ROUTES),
      }
    ]
  }

];

