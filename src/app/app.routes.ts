import { Routes } from '@angular/router';
import { StoreDashboardComponent } from './dashboard/store-dashboard.component/store-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'dashboard/:unit',
    component: StoreDashboardComponent,
  },
];
