import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { PrintData } from './PrintDataModel';
import { ErrorService } from '../shared/error.service';
import { catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { PrintByUnit } from './print-by-unit.model';
import { PrintByDepartment } from './print-by-department.model';

@Injectable({
  providedIn: 'root',
})
export class PrintService {
  private prints = signal<PrintData[]>([]);
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);

  private readonly API = `${environment.apiUrl}/prints/report`;

  loadPrintsReport() {
    return this.getPrints(
      this.API,
      'Something went wrong fetching prints... Please try again later.',
    );
  }

  private getPrints(url: string, errorMessage: string) {
    return this.httpClient.get<PrintData[]>(url).pipe(
      catchError(() => {
        return throwError(() => new Error(errorMessage));
      }),
    );
  }

  getPrintsByUnit(unit: string | null, errorMessage: string) {
    let params = new HttpParams();

    if (unit) {
      params = params.set('unit', unit);
    }

    return this.httpClient
      .get<PrintByUnit[]>(`${this.API}/unit`, { params })
      .pipe(
        catchError(() => {
          return throwError(() => new Error(errorMessage));
        }),
      );
  }

  getPrintsByDepartment(unit: string, errorMessage: string) {

    return this.httpClient.get<PrintByDepartment>(`${this.API}/unit/department?unit=` + unit)
    .pipe(
      catchError( () => {
        return throwError( () => new Error(errorMessage));
      })
    )
  }
}
