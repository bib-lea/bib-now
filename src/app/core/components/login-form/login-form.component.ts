import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  emailControl: FormControl;
  passwordControl: FormControl;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.emailControl = new FormControl('', []);
    this.passwordControl = new FormControl('', []);
  }

  onLogin(): void {
    this.router.navigateByUrl('/dashboard');
  }
}
