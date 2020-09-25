import { Component, OnInit } from '@angular/core';
import {CrudService} from '../../services/crud.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';
import {MatDialog} from '@angular/material/dialog';
import {PostDialogComponent} from '../post-dialog/post-dialog.component';

@Component({
  selector: 'app-mobile-top',
  templateUrl: './mobile-top.component.html',
  styleUrls: ['./mobile-top.component.css']
})
export class MobileTopComponent implements OnInit {

  user: User;

  constructor(
    private afAuth: AngularFireAuth,
    private dialog: MatDialog
  )
  {
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  ngOnInit(): void {
  }

  onPost(): void {
    if (this.user) {
      this.dialog.open(PostDialogComponent, {
        panelClass: 'dialog__wrapper'
      });
    }
  }
}
