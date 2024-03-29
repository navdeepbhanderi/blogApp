import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { authService } from './authService.service';

@Injectable({
  providedIn: 'root',
})
export class loginGuard implements CanActivate {
  constructor(private authService: authService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        if (user) {
          return this.router.createUrlTree(['/blog']);
        }
        return true;
      })
    );
  }
}
