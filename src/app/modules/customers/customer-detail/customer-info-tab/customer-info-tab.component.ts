import { Component, input } from '@angular/core';
import { CustomerDTO } from '../../DTOs/customerDTO';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-customer-info-tab.component',
  imports: [MatIcon],
  templateUrl: './customer-info-tab.component.html',
  styleUrl: './customer-info-tab.component.css',
})
export class CustomerInfoTabComponent {
  // accept the customer payload to display from parent
  customer = input.required<CustomerDTO>();
}
