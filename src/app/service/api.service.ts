import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUri: string = 'http://localhost:5000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}
  // Create
  createUser(data:any): Observable<any> {
    let url = `${this.baseUri}/createUsers`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }
  // Get all Users
  getAllUsers() {
    return this.http.get(`${this.baseUri}/users`);
  }
  // Get User
  getUser(id:any): Observable<any> {
    let url = `${this.baseUri}/users/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map(res=> {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }
  // Update User
  updateUser(id:any, data:any): Observable<any> {
    let url = `${this.baseUri}/update_users/${id}`;
    console.log("update_users,data",data)
    return this.http
      .put(url, data)
      .pipe(catchError(this.errorMgmt));
  }
  // Delete User
  deleteUser(id:any): Observable<any> {
    let url = `${this.baseUri}/delete_users/${id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
  // Error handling
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
    return throwError(() => {
      return errorMessage;
    });
  }
}