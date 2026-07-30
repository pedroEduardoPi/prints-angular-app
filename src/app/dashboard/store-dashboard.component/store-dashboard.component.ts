import { Component } from '@angular/core';
import { GraphicComponent } from '../graphic/graphic.component';

@Component({
  standalone: true,
  selector: 'app-store-dashboard',
  imports: [GraphicComponent],
  templateUrl: './store-dashboard.component.html',
  styleUrl: './store-dashboard.component.css',
})
export class StoreDashboardComponent {


}
