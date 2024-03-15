import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { authService } from '../shared/authService.service';
import { Router } from 'express';

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
    console.log(form);
  }
  checkPath() {
    this.path = !this.path;
  }

  getPath() {
    return this.path ? '../../assets/eyeClose.svg' : '../../assets/eye.svg';
  }
}
