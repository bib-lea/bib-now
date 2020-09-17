import { EventEmitter } from '@angular/core';
import {Component, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import {AuthServiceService} from '../../../shared/services/auth-service.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  animations: [
    trigger('glow', [
      transition('void => *', [
        animate('2s infinite', keyframes([
          style({ opacity: 0, offset: 0 }),
          style({ opacity: 1, offset: 0.5 }),
          style({ opacity: 0, offset: 1 })
        ]))
      ])
    ])
  ]
})
export class LoginFormComponent implements OnInit {

  @Output() isSignUp = new EventEmitter<boolean>();

  loginForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthServiceService,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', []),
      password: new FormControl('', [])
    });

    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        console.log(user.email);
        this.router.navigateByUrl('/dashboard');
      }
      else {
        console.log("NICHT SIGNED-IN");
      }
    });
  }

  onSignup(): void {
    this.isSignUp.emit(true);
  }

  onLogin(): void {
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    const result = this.authService.onLogin(email, password);
    console.log(result);
  }
}
