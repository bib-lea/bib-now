import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthServiceService} from '../../../shared/services/auth-service.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  @Output() isSignup = new EventEmitter<boolean>();

  signupForm: FormGroup;
  authPromise: Promise<void>;

  constructor(
    private authService: AuthServiceService,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', []),
      password: new FormControl('', []),
      passwordReenter: new FormControl('', []),
    });
  }

  onBack(): void {
    this.isSignup.emit(false);
  }

  onSubmit(): void {
    let email = this.signupForm.value.email;
    let password = this.signupForm.value.password;
    this.authService.onSignUp(email, password);
  }
}
