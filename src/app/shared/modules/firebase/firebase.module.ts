import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Libraries für Firebase importieren
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDxes0zBq2k6nz1tmQtMnSPe9PimXOH694",
  authDomain: "bibnow-testing.firebaseapp.com",
  databaseURL: "https://bibnow-testing.firebaseio.com",
  projectId: "bibnow-testing",
  storageBucket: "bibnow-testing.appspot.com",
  messagingSenderId: "101574135416",
  appId: "1:101574135416:web:9c8073ed4f34e45ac9e78d",
  measurementId: "G-4PB9C5HP69"
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage
  ]
})
export class FirebaseModule { }
