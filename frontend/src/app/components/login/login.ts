import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [InputTextModule, ButtonModule],
  templateUrl: './login.html'
})
export class Login {

  constructor(private router: Router) {}

  onLogin() {
    // For now, navigate directly to sub-asset
    // In future, add authentication logic here
    this.router.navigate(['/sub-asset']);
  }
}