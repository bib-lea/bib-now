import { EventEmitter } from '@angular/core';
import {Component, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  @Output() isSignUp = new EventEmitter<boolean>();

  loginForm: FormGroup;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', []),
      password: new FormControl('', [])
    });
  }

  onSignup(): void {
    this.isSignUp.emit(true);
  }

  onLogin(): void {
    this.router.navigateByUrl('/dashboard');
  }
}
