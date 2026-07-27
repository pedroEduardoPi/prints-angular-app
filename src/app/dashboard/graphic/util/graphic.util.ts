import { PrintByUnit } from "../../../print/print-by-unit.model";
import { PrintData } from "../../../print/PrintDataModel";

export function printsPerDay(prints: PrintData[]): Map<string, number> {

    if (prints.length === 0)
        return new Map<string, number>();

    const counts = new Map<string, number>();
    const firstDate = new Date(prints[0].dataImpressao!);
    const year = firstDate.getFullYear();
    const month = firstDate.getMonth();
    const totalDays = daysInMonth(year, month);

    for (let day = 1; day <= totalDays; day++) {
        const label = formatterLabel(day, month + 1);

        counts.set(label, 0);
    }

    for (const print of prints) {
        if (!print.dataImpressao) continue;

        const date = new Date(print.dataImpressao);
        const label = formatterLabel(date.getDate(), date.getMonth() + 1);
        counts.set(label, (counts.get(label) ?? 0) + 1);
    }

    return counts;
}

function daysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
}

export function formatterLabel(day: number, month: number): string {
    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}`;
}

export function filterStore(prints: PrintData[],): PrintData[] {
    return prints.filter(p => p.enderecoDispositivo!.startsWith("172.17.23."));
}

export const chartColors: Record<string, { border: string; background: string }> = {
    MTZ: {
      border: '#7A9A01',
      background: 'rgba(122,154,1,0.25)',
    },
    TCR: {
      border: '#3B82F6',
      background: 'rgba(59,130,246,0.25)',
    },
    'IP-ART': {
      border: '#F59E0B',
      background: 'rgba(245,158,11,0.25)',
    },
    PC: {
      border: '#EF4444',
      background: 'rgba(239,68,68,0.25)',
    },
    PV: {
      border: '#8B5CF6',
      background: 'rgba(139,92,246,0.25)',
    },
    Unknown: {
      border: '#6B7280',
      background: 'rgba(107,114,128,0.25)',
    },
  };

export function getChartColor(unit: string) {
  return chartColors[unit] ?? {
    border: '#FFFFFF',
    background: 'rgba(255,255,255,0.2)',
  };
}
