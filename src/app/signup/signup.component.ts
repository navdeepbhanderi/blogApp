import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NgForm,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { authService } from '../shared/authService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class signupComponent implements OnInit {
  currentUser: any;
  form: any;

  @ViewChild('btn') button: any;
  path = true;
  constructor(private authService: authService, private router: Router) {}
  error = null;
  password: any;
  ngOnInit(): void {
    this.form = new FormGroup({
      fname: new FormControl(null, [Validators.required]),
      lname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/),
        Validators.email,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      cpassword: new FormControl(null, [
        Validators.required,
        this.matchPass.bind(this),
      ]),
    });
    this.authService.user.next(this.currentUser);
    this.router.navigate(['blog']);
  }

  matchPass(control: FormControl): ValidationErrors | null {
    if (this.password !== control.value) {
      return { passNotMatch: true };
    }
    return null;
  }

  onEvent() {
    this.error = null;
  }
  isLoading = false;
  getFormData() {
    if (!this.form.valid) {
      return;
    }
    this.isLoading = true;
    this.authService
      .signup(
        this.form.value.fname,
        this.form.value.lname,
        this.form.value.email,
        this.form.value.password
      )
      .subscribe(
        (response: any) => {
          this.error = null;
          this.router.navigate(['/blog']);
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
