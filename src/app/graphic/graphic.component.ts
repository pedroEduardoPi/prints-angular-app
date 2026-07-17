import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { PrintService } from '../print/print-service';
import { PrintData } from '../print/PrintDataModel';
import { printsPerDay } from './util/graphic.util';

@Component({
  standalone: true,
  selector: 'app-graphic',
  imports: [],
  templateUrl: './graphic.component.html',
  styleUrl: './graphic.component.css',
})

export class GraphicComponent implements OnInit {
  
  private prints = signal<PrintData[] | undefined>(undefined);
  totalPrintsPerMonth = signal<number>(0);
  private printService = inject(PrintService);
  private chart?: Chart;
  private destroyRef = inject(DestroyRef);
  error: any;

  ngOnInit(): void {
    const subscription = this.printService.loadPrintsReport().subscribe({
      next: (prints) => {
        this.prints.set(prints);
        this.totalPrintsPerMonth.set(prints.length);
        this.createChart(prints);
      },
      error: (err) => {
        console.error(err);
      },
    });

    this.destroyRef.onDestroy(subscription.unsubscribe);
  }

  private createChart(prints: PrintData[]) {
    if (prints.length === 0) {
      return;
    }

    const counts = printsPerDay(prints);

    const labels = Array.from(counts.keys());
    const values = Array.from(counts.values());

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('areaChart', {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Impressões',
            data: values,
            fill: true,
            tension: 0.4,
            borderColor: '#5e63ff',
            backgroundColor: 'rgba(94,99,255,0.25)',
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
}
