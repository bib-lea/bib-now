import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {FormControl, Validators} from '@angular/forms';
import {CrudService} from '../../services/crud.service';
import {Post} from '../../models/post';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from "rxjs";
import { AngularFireStorage} from "@angular/fire/storage";
import { finalize } from 'rxjs/operators';
import {DEFAULT_IMAGE_URL} from '../../constants/constants';
import { AuthServiceService } from "../../services/auth-service.service";

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

  isInvalid: boolean = false;
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

  dataPath: any;
  dataFile: any;
  get dataSize(){
    return (this.dataFile.size / 1024).toFixed(2);
  }
  imageURL: string;

  constructor(
    private afAuth: AngularFireAuth,
    private crudService: CrudService,
    private authService: AuthServiceService,

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
    this.contentControl = new FormControl('', [
      Validators.required
    ]);
    this.topicControl = new FormControl(this.topics[0], [
      Validators.required
    ]);
    this.typeControl = new FormControl(this.types[0], [
      Validators.required
    ]);
    this.titleControl = new FormControl('', [
      Validators.required
    ]);
  }

  async onPosten() {
    // BILDER SPEICHERUNG
    if (this.dataFile){
      const fileRef = this.storage.ref(this.dataPath);
      const imageRef = this.storage.upload(this.dataPath, this.dataFile);
      let promise = await imageRef
        .snapshotChanges()
        .pipe(
          finalize(() => {
            // URL des Bildes wird heruntergeladen.
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe(url => {
              if (url) {
                // Bilder werden hier gespeichert.
                this.imageURL = url;
                console.log('Image gespeichert.' + this.imageURL);

                // Post wird hier gespeichert.
                if (this.titleControl.invalid || this.contentControl.invalid || this.topicControl.invalid || this.typeControl.invalid) {
                  this.isInvalid = true;
                  console.log('Form ist nicht gültig.')
                }
                else {
                  this.createPost();
                }
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
        })
    }


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
      author: this.user.displayName || this.user.email,
      //userEmail: this.user.email,
      userId: this.authService.currentUserId,
      datePosted: Date.now(),
      topic: this.topicControl.value,
      type: this.typeControl.value,
      title: this.titleControl.value,
      content: this.contentControl.value,
      imgUrl: this.imageURL || DEFAULT_IMAGE_URL
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
