import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { GraphicComponent } from './graphic/graphic.component';
import { CardComponent } from './cards/card.component/card.component';
import { PrintByUnit } from '../print/print-by-unit.model';
import { PrintService } from '../print/print-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.printsService
      .getPrintsByUnit(
        'http://localhost:8080/prints/report/unit',
        'Something went wrong with fetching report',
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (prints) => {
          this.reports.set(prints);
        },
      });
  }
}
