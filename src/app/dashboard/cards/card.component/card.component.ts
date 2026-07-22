import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  input,
  signal,
} from '@angular/core';

import { Chart } from 'chart.js';
import { PrintData } from '../../../print/PrintDataModel';
import { PrintByUnit } from '../../../print/print-by-unit.model';
import { printsPerDay } from '../../graphic/util/graphic.util';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @ViewChild('chartCanvas')
  chartCanvas!: ElementRef<HTMLCanvasElement>;

  report = input.required<PrintByUnit>();

  totalPrintsPerMonth = signal<number>(0);

  private chart?: Chart;

  // ngAfterViewInit() {
  //   // exemplo:
  //   // this.createChart(this.report().prints);
  // }

  // private createChart(prints: PrintData[]) {
  //   if (prints.length === 0) {
  //     return;
  //   }

  //   const counts = printsPerDay(prints);

  //   const labels = Array.from(counts.keys());
  //   const values = Array.from(counts.values());

  //   if (this.chart) {
  //     this.chart.destroy();
  //   }

  //   this.chart = new Chart(this.chartCanvas.nativeElement, {
  //     type: 'line',

  //     data: {
  //       labels,

  //       datasets: [
  //         {
  //           label: 'Impressões',
  //           data: values,
  //           fill: true,
  //           tension: 0.4,

  //           borderColor: '#7A9A01',
  //           backgroundColor: 'rgba(122, 154, 1, 0.25)',

  //           pointRadius: 0,
  //           pointHoverRadius: 5,
  //           pointHitRadius: 20,
  //         },
  //       ],
  //     },

  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: false,

  //       plugins: {
  //         legend: {
  //           display: false,
  //         },
  //       },

  //       scales: {
  //         x: {
  //           display: false,
  //         },
  //       },
  //     },
  //   });
  // }

  // ngOnDestroy() {
  //   this.chart?.destroy();
  // }
}
