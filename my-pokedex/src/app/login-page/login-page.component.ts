import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  email: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const isLoggedIn = localStorage.getItem('loggedIn');
    const isLoginValue = isLoggedIn ? Boolean(JSON.parse(isLoggedIn)) : false; 
    console.log(isLoginValue);
    if (isLoginValue) {
      this.router.navigate(['/home-page']);
    }
  }

  login(): void {
    if (this.email === 'demo@skills.co.il') {
      localStorage.setItem('loggedIn', JSON.stringify('true'));
      this.router.navigate(['/home-page']);
    } else {
      alert('Unauthorized email address');
    }
  }
}
