import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss']
})
export class EmailLoginComponent implements OnInit {
  //Sammlung an Inputs
  form: FormGroup;

  //Typen, die an Firebase übergeben werden
  type: 'login' | 'signup' | 'reset' = 'signup';

  //Ladestatus
  loading = false;

  //Servernachricht
  serverMessage: string;

  //Konstruktor
  constructor(private afAuth: AngularFireAuth, private fb: FormBuilder) {}

  ngOnInit() {
    //Formbuilder-Group deklarieren
    this.form = this.fb.group({
      //propertyName: [daufault-Wert, Validatoren-Array],
      email: ['', [Validators.required, Validators.email]], //E-Mail-Form-Feld
      password: ['', [Validators.minLength(6), Validators.required]], //Passwort-Form-Feld
      passwordConfirm: ['', []] //Password-Bestätigungs-Feld
    });
  }

  //Methode, die es möglich macht das Form zu ändern, je nach Benutzerangabe
  changeType(val) {
    this.type = val;
  }

  get isLogin() {
    return this.type === 'login'; //Login-Getter
  }

  get isSignup() {
    return this.type === 'signup'; //Signup-Getter
  }

  get isPasswordReset() {
    return this.type === 'reset'; //Reset-Getter
  }

  get email() {
    return this.form.get('email'); //Email-Getter für individuelle Input-Felder im Form
  }
  get password() {
    return this.form.get('password'); //Passwort-Getter für individuelle Input-Felder im Form
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm'); //Passwort-Bestätigung für individuelle Input-Feldern im Form
  }

  get passwordDoesMatch() {
    if (this.type !== 'signup') { //Gibt für alle nicht-sign-up forms true zurück, da wird nur im sign-up form das passwort prüfen wollen
      return true;
    } else {
      return this.password.value === this.passwordConfirm.value; //im sign-up form gibt es zurück ob passwort und passwort-bestätigung gleich sind
    }
  }

  async onSubmit() {
    this.loading = true; //loading-property auf true setzen

    const email = this.email.value; //e-mail aus dem Form
    const password = this.password.value; //passwort aus dem Form

     try {
       if (this.isLogin) {  //im LogIn-Form:
         await this.afAuth.signInWithEmailAndPassword(email, password); //Kommunikation mit Firebase, LogIn mit email und passwort
       }
       if (this.isSignup) { //im Sign-Up Form
         await this.afAuth.createUserWithEmailAndPassword(email, password); //Kommunikation mit Firebase, Nutzererstellung mit email und passwort
      }
      if (this.isPasswordReset) { //im Passwort-Reset-Form
         await this.afAuth.sendPasswordResetEmail(email); //Kommunikation mit Firebase, Senden einer Email an angebene e-Mail mit passwort-reset
        }
         this.serverMessage = 'Check your email'; //Servernachricht
       }
      catch (err) {
       this.serverMessage = err; //Servernachricht
     }

    this.loading = false; //loading-property auf true setzen
  }
}

