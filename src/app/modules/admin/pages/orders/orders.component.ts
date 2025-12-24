
import { Component } from '@angular/core';
import { Book } from '../../models/book';
import { FormGroup, FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { ErrormsgComponent } from '../../../../shared/components/errormsg/errormsg.component';
import { RouterLink } from '@angular/router';
import { Order } from '../../models/order';
@Component({
  selector: 'app-orders',
 imports: [CommonModule, FormsModule, NgFor, NgIf,MatIcon,ReactiveFormsModule, ErrormsgComponent, RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  books: Book[] = [
    {
      isbn: '978-0553380163',
      title: 'A Brief History of Time',
      authors: ['Stephen Hawking'],
      publisher: 'Bantam',
      year: 1988,
      price: 12.99,
      category: 'Science',
      stock: 24,
      threshold: 5
    },
    {
      isbn: '978-0062316097',
      title: 'Sapiens',
      authors: ['Yuval Noah Harari'],
      publisher: 'Harper',
      year: 2011,
      price: 14.99,
      category: 'History',
      stock: 3,
      threshold: 5
    },
  ];
  orderStatuses: ('Pending' | 'Confirmed')[] = ['Pending', 'Confirmed'];
  selectedStatus: 'Pending' | 'Confirmed' | 'All' = 'All';
  searchQuery: string = '';

  showNewOrderForm = false;
  newOrderBookIsbn: string = '';
  newOrderQuantity: number = 1;

  openNewOrderModal() {
    this.showNewOrderForm = true;
  }

  closeNewOrderForm() {
    this.showNewOrderForm = false;
    this.newOrderBookIsbn = '';
    this.newOrderQuantity = 1;
  }

  placeNewOrder() {
    if (!this.newOrderBookIsbn || this.newOrderQuantity < 1) return;

    const newOrder: Order = {
      id: this.orders.length + 1,
      bookIsbn: this.newOrderBookIsbn,
      quantity: this.newOrderQuantity,
      status: 'Pending',
      date: new Date(),
    };

    this.orders.push(newOrder);
    this.filteredOrders = [...this.orders];
    this.closeNewOrderForm();
  }

  confirmOrderOutside(index: number) {
    if (this.orders[index].status === 'Pending') {
      this.orders[index].status = 'Confirmed';
      this.filteredOrders = [...this.orders];
    }
  }

  filterOrders() {
    this.filteredOrders = this.orders.filter(order =>
      order.bookIsbn.includes(this.searchQuery)
    );
  }



filterStatus(status: 'Pending' | 'Confirmed' | 'All') {
  this.selectedStatus = status;
  if (status === 'All') {
    this.filteredOrders = [...this.orders];
  } else {
    this.filteredOrders = this.orders.filter(order => order.status === status);
  }
}

}

