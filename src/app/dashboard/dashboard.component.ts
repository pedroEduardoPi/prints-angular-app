import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { GraphicComponent } from './graphic/graphic.component';
import { CardComponent } from './cards/card.component/card.component';
import { PrintByUnit } from '../print/print-by-unit.model';
import { PrintService } from '../print/print-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

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
  private route = inject(ActivatedRoute);

  ngOnInit() {
  this.route.paramMap
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(params => {
      const unit = params.get('unit');

      this.printsService
        .getPrintsByUnit(
          unit,
          'Something went wrong with fetching report'
        )
        .subscribe({
          next: (prints) => {
            this.reports.set(prints);
          },
        });
    });
}
}
