import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const loggedIn = localStorage.getItem('loggedIn');
    if(loggedIn){
        return true;
    }
    this.router.navigate(['/login-page']);
    return false;
  }

}