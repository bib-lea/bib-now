import { Component, OnInit } from '@angular/core';
import {NavigationLink} from '../../models/navigation-link';
import {NAV_LINKS} from '../../constants/constants';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthServiceService} from '../../services/auth-service.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  links: NavigationLink[];

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private authService: AuthServiceService
  )
  {
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
  }

  onSignout(): void {
    this.afAuth.signOut();
  }
}
