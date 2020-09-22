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
  // Werden geladen
  user: any;
  posts: any[];

  // Form Data
  currentTopic: string;
  currentType: string;
  contentControl: FormControl;
  titleControl: FormControl;
  isInvalid: boolean = false;

  // Constants
  typesFB: string[] = [
    'Suche',
    'Gefunden'
  ];
  typesTT: string[] = [
    'Tutorium',
    'Lerngruppe'
  ];
  topics: string[] = [
    'Fundbüro',
    'Tutorium',
    'Allgemein'
  ];

  // Zum Speichern
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
    this.contentControl = new FormControl('', [
      Validators.required
    ]);
    this.titleControl = new FormControl('', [
      Validators.required
    ]);

    this.afAuth.onAuthStateChanged(user => {
      this.user = user;
      console.log(this.user.email);
    });
  }

  ngOnInit(): void {
    // Initial - Fundbüro
    this.currentTopic = this.topics[0];
    this.currentType = this.typesFB[0];
  }

  async onPosten() {
    // BILDER SPEICHERUNG
    if (this.dataFile && this.checkValidity()) {
      const fileRef = this.storage.ref(this.dataPath);
      const imageRef = this.storage.upload(this.dataPath, this.dataFile);
      const promise = await imageRef
        .snapshotChanges()
        .pipe(
          // Speicherung
          finalize(() => {
            // URL des Bildes wird heruntergeladen.
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe(url => {
              if (url) {
                // Bilder werden hier gespeichert.
                this.imageURL = url;
                console.log('Image gespeichert. ' + this.imageURL);

                // Check Validatity
                if (this.checkValidity()) {
                  this.createPost();
                }
                else {
                  this.isInvalid = true;
                  console.log('Form ist nicht gültig.');
                }
              }
            });
          })
        )
        .subscribe(url => {
          // Task log
          if (url) { console.log('UPLOAD TASK SNAPSHOT: ' + url) }
        });
    }
    else if (this.checkValidity()){
      this.createPost();
      this.selfRef.close();
    }
    else {
      this.isInvalid = true;
    }
  }

  onCancel(): void {
    this.selfRef.close();
  }

  onTopicSelect(topic: string): void {
    this.currentTopic = topic;
    if (topic === 'Fundbüro'){
      this.currentType = this.typesFB[0];
    }
    else if (topic === 'Tutorium'){
      this.currentType = this.typesTT[0];
    }
  }

  prepareImage(event) {
    let n = Date.now();
    this.dataFile = event.target.files[0];
    this.dataPath = `posts/${n}`;
  }

  private createPost(): void {
    // DATEN
    const postData: Post = {
      userEmail: this.user.email,
      username: this.user.displayName || this.user.email,
      datePosted: Date.now(),
      topic: this.currentTopic,
      type: this.currentType,
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
    this.contentControl.reset();
    this.titleControl.reset();
    this.currentType = '';
    this.currentTopic = '';
    this.imageURL = '';
  }

  private checkValidity(): boolean {
    return this.titleControl.valid && this.contentControl.valid;
  }
}
