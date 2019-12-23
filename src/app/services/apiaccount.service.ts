import { Injectable } from '@angular/core';
import { Observable, throwError  } from 'rxjs'
import { catchError, map  } from 'rxjs/operators'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiaccountService {
  baseUri:string = 'http://localhost:8080/payments-system';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  //Add
  createAccount(data): Observable<any> {
    let url = `${this.baseUri}/account/add`;
    return this.http.post(url, data)
 }

 //Get all account
 getAccount() {
   return this.http.get(`${this.baseUri}/account`);
 }

 getaccount(id): Observable<any> {
  let url = `${this.baseUri}/account/${id}`;
  return this.http.get(url, {headers: this.headers}).pipe(
    map((res: Response) => {
      return res || {}
    }),
    catchError(this.errorMgmt)

  )
}


errorMgmt(error: HttpErrorResponse) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
}


}
