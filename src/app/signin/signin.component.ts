import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { authService } from '../shared/authService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss', './../signup/signup.component.scss'],
})
export class signinComponent {
  path = true;
  constructor(private authService: authService, private router: Router) {}
  error = null;
  isLoading = false;

  onEvent() {
    this.error = null;
  }
  getFormData(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    this.authService.signin(form.value.email, form.value.password).subscribe(
      (response: any) => {
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
