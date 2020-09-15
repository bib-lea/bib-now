import { Injectable} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  //Servernachricht
  serverMessage: string;

  constructor(private afAuth: AngularFireAuth) { }

  

  async onLogin( password: string, email: string){
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password); //Kommunikation mit Firebase, LogIn mit email und passwort
    }catch (err){
      this.serverMessage = err; //Servernachricht
    }
  }

  async onSignUp( password: string, email: string){
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password); //Kommunikation mit Firebase, LogIn mit email und passwort
    }catch (err){
      this.serverMessage = err; //Servernachricht
    }
  }

  async onPasswordReset(email: string) {
    try {
      await this.afAuth.sendPasswordResetEmail(email); //Kommunikation mit Firebase, LogIn mit email und passwort
      this.serverMessage = 'Check your email'; //Servernachricht
    }catch (err){
      this.serverMessage = err; //Servernachricht
    }
  }
  
}

