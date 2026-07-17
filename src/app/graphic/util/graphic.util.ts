import { PrintData } from "../../print/PrintDataModel";

export function printsPerDay(prints: PrintData[]): Map<string, number> {
    
    if(prints.length === 0)
        return new Map<string, number>();

    const counts = new Map<string, number>(); 
    const firstDate = new Date(prints[0].dataImpressao!);
    const year = firstDate.getFullYear();
    const month = firstDate.getMonth();
    const totalDays = daysInMonth(year, month);

    for (let day = 1; day <= totalDays; day++){
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
