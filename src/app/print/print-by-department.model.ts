import { PrintsByDate } from "./print-by-date.model";

export interface PrintByDepartment {
    unit: string,
    departments: {
        department: string,
        total: number,
        percentage: number
    } []
}