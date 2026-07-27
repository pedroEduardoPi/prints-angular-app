import {
  AfterViewInit,
  Component,
  ElementRef,
  NgModule,
  OnDestroy,
  ViewChild,
  input,
  signal,
} from '@angular/core';

import { Chart } from 'chart.js';
import { PrintData } from '../../../print/PrintDataModel';
import { PrintByUnit } from '../../../print/print-by-unit.model';
import { getChartColor, printsPerDay } from '../../graphic/util/graphic.util';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements AfterViewInit, OnDestroy {

  constructor(private router: Router) {}
  
  @ViewChild('chartCanvas')
  chartCanvas!: ElementRef<HTMLCanvasElement>;

  report = input.required<PrintByUnit>();

  totalPrintsPerMonth = signal<number>(0);

  protected readonly getChartColor = getChartColor;

  private chart?: Chart;

  ngAfterViewInit() {
    this.createChart();
  }

  ngOnDestroy() {
    this.chart?.destroy();
  }

  private createChart() {
    const labels = this.report().prints.map((p) => p.date);
    const values = this.report().prints.map((p) => p.total);

    this.totalPrintsPerMonth.set(values.reduce((acc, value) => acc + value, 0));

    const color = getChartColor(this.report().unit) ?? {
      border: '#FFFFFF',
      background: 'rgba(255,255,255,0.2)',
    };

    this.chart = new Chart(this.chartCanvas.nativeElement, {
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

        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
          },
        },
      },
    });
  }

  

  goToDetails() {
    console.log(this.report().unit);
    this.router.navigate(['./dashboard', this.report().unit]);
  }
}
