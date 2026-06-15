import {Routes } from '@angular/router';
import { NotificationComponent } from './notification.component';
import { DeliveryAttemptComponent } from './delivery-attempt/delivery-attempt.component';

export const NOTIFICATION_ROUTES: Routes = [
    {
        path: 'notifications',
        component: NotificationComponent,
    },
    {
        path: 'delivery-attempts',
        component: DeliveryAttemptComponent,
    }
];