import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { authService } from '../shared/authService.service';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class signupComponent {
  @ViewChild('btn') button: any;
  path = true;
  constructor(private authService: authService, private router: Router) {}
  error = null;

  onEvent() {
    this.error = null;
  }

  isLoading = false;

  getFormData(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    this.authService
      .signup(
        form.value.fname,
        form.value.lname,
        form.value.email,
        form.value.password
      )
      .subscribe(
        (response: any) => {
          console.log(response);
          this.error = null;
          this.isLoading = false;
        },
        (error: any) => {
          this.error = error;
          console.log(this.error);
          this.isLoading = false;
        }
      );
  }

  checkPath() {
    this.path = !this.path;
  }

  getPath() {
    return this.path ? '../../assets/eyeClose.svg' : '../../assets/eye.svg';
  }
}
