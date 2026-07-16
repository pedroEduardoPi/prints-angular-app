import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { PrintData } from './PrintDataModel';
import { ErrorService } from '../shared/error.service';
import { catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

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
      'Something went wrong fetching places available... Please try again later.',
    );
  }

  // private getPrints(url: string, errorMessage: string) {
  //   return this.httpClient.get<PrintData[]>(url).pipe(
  //     map((resData) => resData.places),
  //     catchError((error) => {
  //       return throwError(() => new Error(errorMessage));
  //     }),
  //   );
  // }

  private getPrints(url: string, errorMessage: string) {
  return this.httpClient.get<PrintData[]>(url).pipe(
    catchError(() => {
      return throwError(() => new Error(errorMessage));
    })
  );
}

}
