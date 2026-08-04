import { Routes } from '@angular/router';
import { StoreDashboardComponent } from './dashboard/store-dashboard/store-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {
    path: '',
    component: DashboardComponent
  },
  {
    path: ':unit',
    component: StoreDashboardComponent,
  },
];
