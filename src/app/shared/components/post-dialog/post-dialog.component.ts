import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {FormControl} from '@angular/forms';
import {CrudService} from '../../services/crud.service';
import {Post} from '../../models/post';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.css']
})
export class PostDialogComponent implements OnInit {

  contentControl: FormControl;
  user: any;
  posts: Post[];

  constructor(
    private afAuth: AngularFireAuth,
    private crudService: CrudService
  )
  {
    this.afAuth.onAuthStateChanged(user => {
      this.user = user;
      console.log(this.user);
    });
  }

  ngOnInit(): void {
    this.contentControl = new FormControl('', []);
  }

  onPosten(): void {
    let post: Post = {
      username: this.user ? this.user.email : 'Anonym',
      content: this.contentControl.value
    };

    this.crudService.createPost(post)
      .then(res => {
        console.log(res);
        this.resetControl();
      })
      .catch(err => {
        console.log(err);
      });
  }

  private resetControl(): void {
    this.contentControl.reset();
  }
}
