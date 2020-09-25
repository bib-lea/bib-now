import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CrudService} from '../../../shared/services/crud.service';
import {Post} from '../../../shared/models/post';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, AfterContentChecked {

  // Firebase
  user: User;

  settingsForm: FormGroup;
  myTT: Post[];
  private _allPosts: Post[];

  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged(user => {
      if (user)
        this.user = user;
    }).then(() => {});
    this.settingsForm = this.fb.group({
      username: ''
    })
  }

  ngAfterContentChecked(): void {
   this.crudService.getPost().subscribe(data => {
     if (data){
      this._allPosts = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Post
      });
      if (this.user) {
        this.myTT =
        this._allPosts.filter(p => p.userEmail === this.user.email && p.topic === 'Tutorium');
      }
     }});
  }
}
