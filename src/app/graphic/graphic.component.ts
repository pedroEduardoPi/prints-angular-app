import { Component, inject, OnInit, signal } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { PrintService } from '../print/print-service';
import { PrintData } from '../print/PrintDataModel';

@Component({
  standalone: true,
  selector: 'app-graphic',
  imports: [],
  templateUrl: './graphic.component.html',
  styleUrl: './graphic.component.css',
})

export class GraphicComponent implements OnInit {
  prints = signal<PrintData[] | undefined>(undefined);
  totalPrintsPerMonth = signal<number>(0);
  printService = inject(PrintService);
  private chart?: Chart;
  destroyRef: any;
  error: any;

  ngOnInit(): void {
    this.printService.loadPrintsReport().subscribe({
      next: (prints) => {
        this.prints.set(prints);
        this.totalPrintsPerMonth.set(prints.length);
        this.createChart(prints);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  private createChart(prints: PrintData[]) {
    if (prints.length === 0) {
      return;
    }

    const counts = new Map<string, number>();

    const firstDate = new Date(prints[0].dataImpressao!);
    const year = firstDate.getFullYear();
    const month = firstDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const label = `${day.toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}`;

      counts.set(label, 0);
    }

    for (const print of prints) {
      if (!print.dataImpressao) continue;

      const date = new Date(print.dataImpressao);

      const label = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}`;

      counts.set(label, (counts.get(label) ?? 0) + 1);
    }

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
