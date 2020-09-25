import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavigationLink} from '../../models/navigation-link';
import {NAV_LINKS} from '../../constants/constants';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthServiceService} from '../../services/auth-service.service';
import {PostDialogComponent} from '../post-dialog/post-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  links: NavigationLink[];
  searchControl: FormControl;
  @Output() search = new EventEmitter<string>();

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private authService: AuthServiceService,
    private dialog: MatDialog
  )
  {
    this.searchControl = new FormControl();
    console.log('AUTHSERVICE: ' + this.authService.authenticated);
    this.afAuth.onAuthStateChanged(user => {
      if (!user)
      {
        console.log('FIREBASE: USER IST NICHT EINGELOGGT');
        this.router.navigateByUrl('/login');
      }
      else {
        console.log('FIREBASE: USER IST EINGELOGGT');
      }
    })
    this.links = NAV_LINKS;
  }

  ngOnInit(): void {
    // Search Sub
    this.searchControl.valueChanges.subscribe(val => {
      this.search.emit(val);
    });
  }

  onHome(): void {
    this.router.navigateByUrl('/dashboard')
      .then((res) => {
        console.log(res);
      });
  }

  onSignout(): void {
    this.afAuth.signOut();
  }

  onPost(): void {
    this.dialog.open(PostDialogComponent, {
      panelClass: 'dialog__wrapper'
    });
  }

  onProfile(): void {
    this.router.navigateByUrl('/settings')
      .then(res => {
        console.log(res);
      });
  }
}
