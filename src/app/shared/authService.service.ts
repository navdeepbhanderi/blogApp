import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';

export interface authData {
  fname?: string;
  lname?: string;
  email: string;
  password: string;
  token?: string;
}

@Injectable({ providedIn: 'root' })
export class authService {
  constructor(private http: HttpClient) {}

  signup(fname: string, lname: string, email: string, password: string) {
    return this.http
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDuC0Q5KpzO4HFECk5134ITRz2r3UrHGN8',
        {
          email: email,
          password: password,
        }
      )
      .pipe(
        tap((response: any) => {
          if (response.idToken) {
            this.http
              .post(
                'https://blogapp-d3e54-default-rtdb.firebaseio.com/users.json',
                {
                  id: response.idToken,
                  fname: fname,
                  lname: lname,
                }
              )
              .subscribe(
                (data) => {
                  response.fname = fname;
                  response.lname = lname;
                },
                catchError((error: any): any => {
                  throwError('error');
                })
              );
          }
        }),
        catchError(this.handleError)
      );
  }

  signin() {
    return this.http
      .get(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDuC0Q5KpzO4HFECk5134ITRz2r3UrHGN8'
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let defaultError = 'An unknown Error occured';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(defaultError);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        defaultError = 'Email already exists';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        defaultError = 'Your email or password is wrong';
        break;
      case 'MISSING_PASSWORD':
        defaultError = 'Your email or password is wrong';
        break;
      case 'EMAIL_NOT_FOUND':
        defaultError = 'Your email is not exists';
        break;
    }
    return throwError(defaultError);
  }
}
