import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthServiceService } from "../../../shared/services/auth-service.service";
import { CrudService } from "../../../shared/services/crud.service";
import { FormControl } from "@angular/forms";
import { AngularFireStorage} from "@angular/fire/storage";
import { Observable, from } from "rxjs";
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router'
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  private user: firebase.User;

  constructor(
    private crudservice: CrudService,
    private storage: AngularFireStorage,
    private route: ActivatedRoute,
    private fireService: AngularFirestore,
    public afAuth: AngularFireAuth) {
      afAuth.authState.subscribe(user => {
        this.user = user;
      });
    }

  displayName: FormControl;
  photoURL: string;
  downloadURL: Observable<string>;

  ngOnInit(): void {
  }

  Save(){
    var userData = {
      displayName: this.displayName.value,
      photoURL: this.photoURL
    }
    this.fireService.doc('users');
  }

  upload(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `users/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`users/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.photoURL = url;
            }
            console.log(this.photoURL);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
    }
}
