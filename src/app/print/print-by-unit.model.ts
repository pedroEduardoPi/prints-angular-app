import { PrintsByDate } from './print-by-date.model';

export interface PrintByUnit {
  unit: string;
  prints: PrintsByDate[];
}