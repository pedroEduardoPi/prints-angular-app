import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { PrintData } from '../../print/PrintDataModel';
import { PrintService } from '../../print/print-service';
import { Chart } from 'chart.js';
import { filterStore, printsPerDay } from '../../graphic/util/graphic.util';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {

  private prints = signal<PrintData[] | undefined>(undefined);
  private printService = inject(PrintService);
  totalPrintsPerMonth = signal<number>(0);
  private chart?: Chart;
  private destroyRef = inject(DestroyRef);


  ngOnInit(): void {
    const subscription = this.printService.loadPrintsReport().subscribe({
      next: (prints) => {
        const filteredPrints = filterStore(prints);

        this.totalPrintsPerMonth.set(filteredPrints.length);
        this.createChart(filteredPrints);
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

    this.chart = new Chart('pvChart', {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Impressões',
            data: values,
            fill: true,
            tension: 0.4,
            borderColor: '#7A9A01',
            backgroundColor: 'rgba(122, 154, 1, 0.25)',
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
            display: false
          }
        }
      },
    });
  }
}
