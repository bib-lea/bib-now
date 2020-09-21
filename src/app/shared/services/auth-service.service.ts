import { Injectable} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {actionCodeSettings, environment} from '../../../environments/environment';
import {AngularFirestoreDocument, AngularFirestore} from '@angular/fire/firestore';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  //Servernachricht
  serverMessage: string;
  authState: any = null;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore
  ) { }

  authenticated() {
    return this.afAuth.authState.pipe(first()).toPromise()
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : null
  }


  onLogin(email: string, password: string) {
    //Kommunikation mit Firebase, LogIn mit email und passwort
    this.afAuth.signInWithEmailAndPassword(email, password)
      .catch(err => console.log(err.message));
  }

  onSignUp(email: string, password: string){
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        this.setUserData(result.user);
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  async onPasswordReset(email: string) {
    try {
      await this.afAuth.sendPasswordResetEmail(email); //Kommunikation mit Firebase, LogIn mit email und passwort
      this.serverMessage = 'Check your email'; //Servernachricht
    }catch (err){
      this.serverMessage = err; //Servernachricht
    }
  }

  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc('users/' + user.uid);
    const userData: any = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }
}

