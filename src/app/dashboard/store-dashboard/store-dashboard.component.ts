import { Component, inject, OnInit } from '@angular/core';
import { GraphicComponent } from '../graphic/graphic.component';
import { ActivatedRoute } from '@angular/router';
import { PrintService } from '../../print/print-service';
import { DepartmentDashboardComponent } from "../department-dashboard/department-dashboard.component";

@Component({
  standalone: true,
  selector: 'app-store-dashboard',
  imports: [GraphicComponent, DepartmentDashboardComponent],
  templateUrl: './store-dashboard.component.html',
  styleUrl: './store-dashboard.component.css',
})
export class StoreDashboardComponent implements OnInit {
  route = inject(ActivatedRoute);
  unit: string | null = '';
  
  ngOnInit() {
    this.unit = this.route.snapshot.paramMap.get('unit');
  }
}
