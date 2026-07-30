import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { GraphicComponent } from './graphic/graphic.component';
import { CardComponent } from './cards/card.component/card.component';
import { PrintByUnit } from '../print/print-by-unit.model';
import { PrintService } from '../print/print-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [GraphicComponent, CardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  reports = signal<PrintByUnit[]>([]);
  private printsService = inject(PrintService);

  ngOnInit() {
    this.printsService
      .getPrintsByUnit(
        `${environment.apiUrl}/prints/report/unit`,
        'Something went wrong with fetching report',
      )
      .pipe()
      .subscribe({
        next: (prints) => {
          this.reports.set(prints);
        },
      });
  }
}
