import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {

  isSignup = false;
  @Input() formState: string;

  constructor() { }

  ngOnInit(): void {

  }

  onSelect(event): void {
    if (event.target.name === 'signup') {
      this.formState = 'signup';
    }
    else {
      this.formState = 'login';
    }
  }

  onFormStateChanged(state): void {
    this.formState = state;
  }
}
