import { Routes } from '@angular/router';
import{ ADMIN_ROUTES } from './modules/admin/admin.routes';
import{ AUTH_ROUTES } from './modules/auth/auth.routes';
import path from 'path';
export const routes: Routes = [
  ...ADMIN_ROUTES,
  ...AUTH_ROUTES,
  {path: '', redirectTo: 'auth/login', pathMatch: 'full'}

];
