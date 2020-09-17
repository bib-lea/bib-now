import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {MatDialog} from '@angular/material/dialog';
import {PostDialogComponent} from '../post-dialog/post-dialog.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  user: any;

  constructor(
    private afAuth: AngularFireAuth,
    private dialog: MatDialog
  )
  {
    this.afAuth.onAuthStateChanged(user => {
      this.user = user;
      console.log(this.user);
    }).catch(err => { throw err });
  }

  ngOnInit(): void {
  }

  onPost(): void {
    this.dialog.open(PostDialogComponent);
  }
}
