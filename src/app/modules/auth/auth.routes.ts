import { Routes } from "@angular/router";
import { AuthLayoutComponent } from "../../layouts/auth-layout/auth-layout.component";

export const AUTH_ROUTES: Routes = [
  {
    path: "auth",
    component: AuthLayoutComponent,
    children: [
      {
        path: "login",
        loadComponent: () =>
          import("./pages/login/login.component").then(c => c.LoginComponent),
        title: "Login"
        // canActivate: [guestGuard]
      }
    ]
  }
];
