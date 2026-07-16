import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { PrintData } from './PrintDataModel';
import { ErrorService } from '../shared/error.service';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PrintService {
  private prints = signal<PrintData[]>([]);
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);


  loadPrintsReport() {
    return this.getPrints(
      'http://localhost:8080/prints/report',
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
