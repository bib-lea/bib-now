import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {

  isSignup = false;

  constructor() { }

  ngOnInit(): void {

  }

  onSwitch(event): void {
    this.isSignup = event;
  }
}
