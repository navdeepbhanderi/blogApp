import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './auth.modal';
import { Router } from '@angular/router';

export interface authData {
  fname?: string;
  lname?: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  idToken: string;
  email: string;
  token?: string;
}

@Injectable({ providedIn: 'root' })
export class authService {
  constructor(private http: HttpClient, private router: Router) {}
  user = new BehaviorSubject<User | any>(null);
  signup(fname: string, lname: string, email: string, password: string) {
    return this.http
      .post<authData>(
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
                  id: response.localId,
                  fname: fname,
                  lname: lname,
                }
              )
              .subscribe(
                (data: any) => {
                  response.fname = fname;
                  response.lname = lname;
                  this.handleAuth(
                    response.fname,
                    response.lname,
                    response.email,
                    response.localId,
                    response.idToken,
                    +response.expiresIn
                  );
                  console.log(response);
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

  signin(email: string, password: string) {
    return this.http
      .post<authData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDuC0Q5KpzO4HFECk5134ITRz2r3UrHGN8',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        tap((response: any) => {
          if (response.idToken) {
            this.http
              .get(
                'https://blogapp-d3e54-default-rtdb.firebaseio.com/users.json'
              )
              .pipe(
                tap((data: any) => {
                  for (const key in data) {
                    if (Object.prototype.hasOwnProperty.call(data, key)) {
                      if (data[key].id === response.localId) {
                        response.fname = data[key].fname;
                        response.lname = data[key].lname;
                      }
                    }
                  }
                })
              )
              .subscribe((data: any) => {
                this.handleAuth(
                  response.fname,
                  response.lname,
                  response.email,
                  response.localId,
                  response.idToken,
                  +response.expiresIn
                );
              });
          }
        }),
        tap((response: any) => {}),
        catchError(this.handleError)
      );
  }

  autoLogin() {
    let currentUser = localStorage.getItem('userBlog');
    if (currentUser) {
      currentUser = JSON.parse(currentUser);
      this.user.next(currentUser);
      let route = this.router.routerState.snapshot.url;
      this.router.navigate([route]);
    } else {
      return;
    }
  }
  logout() {
    this.router.navigate(['/signup']);
    this.user.next(null);
    localStorage.removeItem('userBlog');
  }
  handleAuth(
    fname: string,
    lname: string,
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(fname, lname, email, userId, token, expirationDate);
    this.user.next(user);
    this.router.navigate(['/blog']);
    localStorage.setItem('userBlog', JSON.stringify(user));
  }

  handleError(errorRes: HttpErrorResponse) {
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
