import { Component, OnInit } from '@angular/core';
import { authService } from '../shared/authService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class headerComponent implements OnInit {
  isAuthenticated = false;
  currentUser: any;
  constructor(private authService: authService, private router: Router) {}
  ngOnInit(): void {
    this.authService.user.subscribe((data) => {
      this.currentUser = data;
      this.isAuthenticated = !!data;
      console.log(this.currentUser);
    });
  }
  onLogout() {
    this.authService.logout();
  }
}
