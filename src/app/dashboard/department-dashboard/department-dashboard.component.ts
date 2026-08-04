import { Component, inject, OnInit, signal } from '@angular/core';
import { PrintService } from '../../print/print-service';
import { PrintByDepartment } from '../../print/print-by-department.model';
import { ActivatedRoute } from '@angular/router';
import { DecimalPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-department',
  imports: [DecimalPipe],
  templateUrl: './department-dashboard.component.html',
  styleUrl: './department-dashboard.component.css',
})
export class DepartmentDashboardComponent implements OnInit {
  printService = inject(PrintService);
  private route = inject(ActivatedRoute);
  departments = signal<PrintByDepartment | undefined>(undefined);

  ngOnInit() {
    const unit = this.route.snapshot.paramMap.get('unit');

    if (!unit) {
      return;
    }

    this.printService
      .getPrintsByDepartment(
        unit,
        'Something went wrong fetching departments prints. Please try again later.',
      )
      .subscribe({
        next: (data) => {
          this.departments.set(data);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
