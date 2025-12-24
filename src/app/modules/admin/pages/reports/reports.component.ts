import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, FormsModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent {
  totalSalesPreviousMonth = 1250;
  totalSalesPreviousWeek = 310;
  showLastMonth = true;

  topCustomers = [
    { name: 'Alice', amount: 500 },
    { name: 'Bob', amount: 450 },
    { name: 'Charlie', amount: 400 },
    { name: 'David', amount: 300 },
    { name: 'Eve', amount: 250 },
  ];

  topBooks = [
    { title: 'Book A', copiesSold: 120, orders: 15 },
    { title: 'Book B', copiesSold: 110, orders: 10 },
    { title: 'Book C', copiesSold: 95, orders: 12 },
    { title: 'Book D', copiesSold: 90, orders: 8 },
    { title: 'Book E', copiesSold: 80, orders: 5 },
  ];

  selectedBook = this.topBooks[0].title;
  bookOrderCount = this.topBooks[0].orders;

  salesChartData: ChartData<'bar'> = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Total Sales',
      data: [1000, 1200, 900, this.totalSalesPreviousMonth],
      backgroundColor: getComputedStyle(document.documentElement).getPropertyValue(' --foreground_color') || '#0B67E6'
    }],
  };

  salesChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    animation: { duration: 800 },
    plugins: { legend: { display: false } },
  };

  salesChartType: 'bar' = 'bar';

  topCustomersChartData: ChartData<'pie'> = {
    labels: this.topCustomers.map(c => c.name),
    datasets: [
      {
        label: 'Purchases',
        data: this.topCustomers.map(c => c.amount),
        backgroundColor: [
          '#667fffff',
          '#d966ffff',
          '#FF6666',
          '#FF9900',
          '#33CC33',
        ],
      },
    ],
  };
  topCustomersChartType: 'pie' = 'pie';
  topCustomersChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#0043fdff'
        }
      }
    }
  };

  toggleSalesPeriod() {
    this.showLastMonth = !this.showLastMonth;
    const data = this.showLastMonth
      ? [1000, 1200, 900, this.totalSalesPreviousMonth]
      : [80, 90, 70, this.totalSalesPreviousWeek];
    const labels = this.showLastMonth ? ['Week 1', 'Week 2', 'Week 3', 'Week 4'] : ['Mon', 'Tue', 'Wed', 'Thu'];
    this.salesChartData.datasets[0].data = data;
    this.salesChartData.labels = labels;
    this.updateBarChartColor();
  }

  updateBarChartColor() {
    const color = getComputedStyle(document.documentElement).getPropertyValue('--primary_color') || '#0B67E6';
    this.salesChartData.datasets[0].backgroundColor = color;
  }

  updateBookOrderCount() {
    const book = this.topBooks.find(b => b.title === this.selectedBook);
    this.bookOrderCount = book ? book.orders : 0;
  }

  printPage() { window.print(); }
}
