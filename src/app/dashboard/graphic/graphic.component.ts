import {
  Component,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { Chart } from 'chart.js/auto';
import { getChartColor, printsPerDay } from './util/graphic.util';
import { PrintData } from '../../print/PrintDataModel';
import { PrintService } from '../../print/print-service';
import { PrintByUnit } from '../../print/print-by-unit.model';

@Component({
  standalone: true,
  selector: 'app-graphic',
  imports: [],
  templateUrl: './graphic.component.html',
  styleUrl: './graphic.component.css',
})
export class GraphicComponent implements OnInit, OnChanges, OnDestroy {
  @Input() param: string | null = null;
  private printService = inject(PrintService);
  private prints = signal<PrintData[]>([]);
  private printsByUnit = signal<PrintByUnit | undefined>(undefined);
  totalPrintsPerMonth = signal<number>(0);
  private chart?: Chart;

  ngOnInit(): void {
    this.loadChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['param'] && !changes['param'].firstChange) {
      this.destroyChart();
      this.loadChart();
    }
  }

  ngOnDestroy(): void {
    this.destroyChart();
  }

  private loadChart(): void {
    if (this.param) {
      this.loadChartByUnit();
    } else {
      this.loadGeneralChart();
    }
  }

  private loadGeneralChart(): void {
    this.printService.loadPrintsReport().subscribe({
      next: (prints) => {
        this.prints.set(prints);
        this.totalPrintsPerMonth.set(prints.length);

        this.createGeneralChart(prints);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  private loadChartByUnit(): void {
    if (!this.param) {
      return;
    }

    this.printService
      .getPrintsByUnit(
        this.param,
        'Something went wrong fetching prints... Please try again later.',
      )
      .subscribe({
        next: (prints) => {
          const printByUnit = prints[0];

          if (!printByUnit) {
            return;
          }

          this.printsByUnit.set(printByUnit);

          this.createChartByUnit(printByUnit);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  private createGeneralChart(prints: PrintData[]): void {
    if (prints.length === 0) {
      return;
    }

    const counts = printsPerDay(prints);

    const labels = Array.from(counts.keys());
    const values = Array.from(counts.values());

    this.totalPrintsPerMonth.set(values.reduce((acc, value) => acc + value, 0));

    this.createChart(labels, values, {
      border: '#5e63ff',
      background: 'rgba(94,99,255,0.25)',
    });
  }

  private createChartByUnit(printByUnit: PrintByUnit): void {
    if (printByUnit.prints.length === 0) {
      return;
    }

    const labels = printByUnit.prints.map((p) => p.date);
    const values = printByUnit.prints.map((p) => p.total);

    this.totalPrintsPerMonth.set(values.reduce((acc, value) => acc + value, 0));

    const color = getChartColor(this.param!);

    this.createChart(labels, values, color);
  }

  private createChart(
    labels: string[],
    values: number[],
    color: {
      border: string;
      background: string;
    },
  ): void {
    this.destroyChart();

    this.chart = new Chart('areaChart', {
      type: 'line',

      data: {
        labels,

        datasets: [
          {
            data: values,
            fill: true,
            tension: 0.4,

            borderColor: color.border,
            backgroundColor: color.background,

            pointRadius: 0,
            pointHoverRadius: 5,
            pointHitRadius: 20,
          },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }

  private destroyChart(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }
  }
}
