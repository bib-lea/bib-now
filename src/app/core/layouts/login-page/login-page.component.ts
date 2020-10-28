import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MediaChange, MediaObserver} from '@angular/flex-layout';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {

  isMobile: boolean;
  activeMediaQuery = '';
  @Input() formState: string;

  constructor(
    private mediaObserver: MediaObserver,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.mediaObserver.asObservable().subscribe((changes: MediaChange[]) => {
      const change = changes[0];
      this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
      this.isMobile = change.mqAlias === 'xs';
    });
    this.afAuth.onAuthStateChanged(user => {
      if (user)
      {
        console.log("eingeloggt.");
      }
      else
      {
        console.log("Nicht angemeldet.");
      }
    });
  }

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
