import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
export const ADMIN_ROUTES: Routes = [
  {
    path: "admin",
    component: AdminLayoutComponent,
    children: [
      {
       path: "books",
        loadComponent: () =>
          import("./pages/books/books.component").then(c => c.BooksComponent),
        title: "Books"},{
        path:"dashboard",
        loadComponent: () =>
          import("./pages/dashboard/dashboard.component").then(c => c.DashboardComponent),
        title: "Dashboard"

        // canActivate: [guestGuard]
      },{
        path:"orders",
        loadComponent: () =>
          import("./pages/orders/orders.component").then(c => c.OrdersComponent),
        title: "Orders"
      },
      {
        path:"reports",
        loadComponent: () =>
          import("./pages/reports/reports.component").then(c => c.ReportsComponent),
        title: "Reports"
      }
    ]
  }
];
