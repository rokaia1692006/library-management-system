import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [NgFor,NgIf,NgClass,MatIcon]

})
export class DashboardComponent {
  //random data for testing
  stats = [
    { label: 'Total Sales', value: '$12,450' },
    { label: 'Orders', value: '342' },
    { label: 'Customers', value: '1,248' },
    { label: 'Books', value: '86' }
  ];

  orders = [
    { id: 'Order #1023', items: 2, total: '$45.00', status: 'Pending' },
    { id: 'Order #1022', items: 1, total: '$24.99', status: 'Completed' },
    { id: 'Order #1021', items: 4, total: '$112.50', status: 'Completed' }
  ];
}
