import { Component, OnInit } from '@angular/core';
import { NavigationLink } from '../../../shared/models/navigation-link';
import { NAV_LINKS } from '../../../shared/constants/constants';
import {AngularFireAuth} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  navLinks: NavigationLink[];

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.navLinks = NAV_LINKS;
  }

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged(user => {
      console.log(user.email);
    });
  }

  onSignOut(): void {
    this.afAuth.signOut()
      .then(result => {
        console.log("Signed out." + result);
        this.router.navigateByUrl('/login');
      })
      .catch(err => {
        console.log(err);
      });
  }
}
