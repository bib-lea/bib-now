import { MatSnackBar } from '@angular/material/snack-bar';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthServiceService} from '../../../shared/services/auth-service.service';
import {AngularFireAuth} from '@angular/fire/auth';
import { Input } from '@angular/core';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  @Output() formState = new EventEmitter<string>();
  @Input() isMobile: boolean;

  reenterValid: boolean = false;
  signupForm: FormGroup;
  authPromise: Promise<void>;

  constructor(
    private authService: AuthServiceService,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      reenter: ['', Validators.required]
    });
    this.signupForm.valueChanges.subscribe(val => {
      if (val.password && val.password === val.reenter)
      {
        this.reenterValid = true;
      }
      else
      {
        this.reenterValid = false;
      }
    });
  }

  onBack(): void {
    this.formState.emit('');
  }

  onSubmit(): void {
    if (this.signupForm.valid && this.signupForm.value.email && this.signupForm.value.password && this.reenterValid)
    {
      let { email, password } = this.signupForm.value;
      email += '@edu.bib.de';
      let user = this.authService.onSignUp(email, password);
      var actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: 'https://bib-now-274d1.web.app/dashboard',
        // This must be true.
        handleCodeInApp: true,
      };

      this.afAuth.sendSignInLinkToEmail(email, actionCodeSettings)
        .then(() => {
          this.snackbar.open('Email wurde geschickt! Bitte folgen Sie den Link.', 'Schließen', {
            duration: 3000
          });
          this.formState.emit('');
        })
        .catch(err => {
          console.log(err);
        });
    }
    else 
    {
      this.snackbar.open('Registrieren fehlgeschlagen. Bitte versuchen Sie nochmals.', 'Schließen', {
        duration: 3000
      });
    }
  }
}
