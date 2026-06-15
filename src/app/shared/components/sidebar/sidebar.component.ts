import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {FontAwesomeModule, FaIconLibrary} from "@fortawesome/angular-fontawesome";
import { faHome, faUsers} from '@fortawesome/free-solid-svg-icons';
import {MatIconModule} from '@angular/material/icon';

interface SidebarChildItem {
  label: string;
  path: string;
  iconClass: string; 
}

interface SidebarMenuItem {
  label: string;
  iconClass: string;
  path?: string;
  children?: SidebarChildItem[];
}


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, UpperCasePipe, RouterLink, RouterLinkActive, FontAwesomeModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})

export class SidebarComponent {

  collapsed = signal<boolean>(false);
  collapsedChange = output<boolean>();

  // A record traking the open state for menus
  openMenus = signal<Record<string, boolean>>({
    Dashboard: false,
    Customers: false,
    Assets: false,
    'Work Orders': false,
    Billing: false,
    Notifications: false,
    System: false,
  });

  menuItems: SidebarMenuItem[] = [
    {
      label: 'Dashboard',
      iconClass: 'home',
      path: '/dashboard',  
    },
    {
      label: 'Customers',
      iconClass: 'group',
      children: [
        { label: 'Customer List', path: '/apps/customers/list', iconClass: 'contacts' },
        { label: 'Customer Sites', path: '/apps/customers/sites', iconClass: 'device_hub' },
        { label: 'Contacts', path: '/apps/customers/contacts', iconClass: 'recent_actors' },
      ],
    },
    {
      label: 'Assets',
      iconClass: 'engineering',
      children: [
        { label: 'Asset Registry', path: '/apps/assets/registry', iconClass: 'domain' },
        { label: 'Asset Types', path: '/apps/assets/types', iconClass: 'build' },
        {label: 'Asset History', path: '/apps/assets/history', iconClass: 'history' },
      ],
    },
    {
      label: 'Work Orders',
      iconClass: 'list_alt',
      children: [
        { label: 'Work Orders', path: '/apps/work-orders', iconClass: 'list_alt' },
        { label: 'Tasks', path: '/apps/work-orders/tasks', iconClass: 'assignment' },
        { label: 'Assignments', path: '/apps/work-orders/assignments', iconClass: 'assignment_ind' },
        { label: 'Reports', path: '/apps/work-orders/reports', iconClass: 'insert_chart_outlined' },
      ],  
    },
    {
      label: 'Billing',
      iconClass: 'attach_money',
      children: [
        { label: 'Invoices', path: '/apps/billing/invoices', iconClass: 'money' },
        { label: 'Pricing Policies', path: '/apps/billing/pricing-policies', iconClass: 'monetization_on' },
      ],
    },
    {
      label: 'Notifications',
      iconClass: 'notifications',
      children: [
        { label: 'Notifications', path: '/apps/notifications', iconClass: 'notifications' },
        { label: 'Delivery Attempts', path: '/apps/notifications/delivery-attempts', iconClass: 'notifications_paused' },
      ],
    },
    {
      label: 'System',
      iconClass: 'dns',
      children: [
        { label: 'Kafka', path: '/apps/system/kafka-events', iconClass: 'event_available' },
        { label: 'OutboxEvents', path: '/apps/system/outbox-events', iconClass: 'event_busy' },
      ],
    },

  ];

  toggleCollapsed() {
    this.collapsed.update(value => !value);
    this.collapsedChange.emit(this.collapsed());
  }

  toggleMenu(label: string) {
    this.openMenus.update(current => {
      // 1. Check if the menu we clicked is already open
      const isAlreadyOpen = current[label];

      // 2. Create a clean base object where all menus are closed (false)
      const closedState: Record<string, boolean> = {
        Dashboard: false,
        Customers: false,
        Assets: false,
        'Work Orders': false,
        Billing: false,
        Notifications: false,
        System: false,
      };

      // 3. Return the new state: if it was closed, open it. If it was open, leave it closed.
      return {
        ...closedState,
        [label]: !isAlreadyOpen
      };
    });
  }


}
