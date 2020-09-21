import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {FormControl} from '@angular/forms';
import {CrudService} from '../../services/crud.service';
import {Post} from '../../models/post';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from "rxjs";
import { AngularFireStorage} from "@angular/fire/storage";
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.css']
})
export class PostDialogComponent implements OnInit {

  contentControl: FormControl;
  topicControl: FormControl;
  titleControl: FormControl;
  typeControl: FormControl;

  user: any;
  posts: any[];

  types: string[] = [
    'Suche',
    'Gefunden'
  ];
  topics: string[] = [
    'Fundbüro',
    'Tutorium',
    'Q&A'
  ];

  downloadURL: Observable<string>;

  dataPath: string;
  dataFile: string;
  imageURL: string;

  constructor(
    private afAuth: AngularFireAuth,
    private crudService: CrudService,

    private selfRef: MatDialogRef<PostDialogComponent>,
    private storage: AngularFireStorage
  )
  {
    this.afAuth.onAuthStateChanged(user => {
      this.user = user;
      console.log(this.user.email);
    });
  }

  ngOnInit(): void {
    this.contentControl = new FormControl('', []);
    this.topicControl = new FormControl(this.topics[0], []);
    this.typeControl = new FormControl(this.types[0], []);
    this.titleControl = new FormControl('', []);
  }

  async onPosten() {
    // BILDER SPEICHERUNG
    const fileRef = this.storage.ref(this.dataPath);
    const imageRef = this.storage.upload(this.dataPath, this.dataFile);
    let promise = await imageRef
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.imageURL = url;
              console.log('Image gespeichert.' + this.imageURL);
            }
            else {
              console.log('Nicht gespeichert.' + this.imageURL);
            }
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log('UPLOAD TASK SNAPSHOT: ' + url);
        }
      });

    // POST SPEICHERUNG
    this.createPost();
  }

  prepareImage(event) {
    let n = Date.now();
    this.dataFile = event.target.files[0];
    this.dataPath = `posts/${n}`;
    console.log(this.dataFile);
    console.log(this.dataPath);
  }

  onCancel(): void {
    this.selfRef.close();
  }

  private createPost(): void {
    // DATEN
    const postData: Post = {
      //author: this.afAuth.authState.displayName || this.auth.authState.email,
      userEmail: this.user.email,
      //authorId: this.afAuth.currentUserId
      datePosted: Date.now(),
      topic: this.topicControl.value,
      type: this.typeControl.value,
      title: this.titleControl.value,
      content: this.contentControl.value,
      imgUrl: this.imageURL || '',
    }

    // POST SPEICHERUNG
    this.crudService.createPost(postData).then(res => {
      this.resetControls();
      console.log(res);
    });
  }

  private resetControls(): void {
    this.topicControl.reset();
    this.contentControl.reset();
    this.titleControl.reset();
    this.typeControl.reset();
    this.imageURL = '';
  }
}
