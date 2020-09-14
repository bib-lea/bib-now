import { Component, OnInit } from '@angular/core';
import {NavigationLink} from '../../../shared/models/navigation-link';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  navLinks: NavigationLink[];

  constructor() {
    this.navLinks = [
      {
        name: 'Dashboard',
        url: '/dashboard',
        iconName: 'home'
      },
      {
        name: 'Stundenplan',
        url: '/stundenplan',
        iconName: 'calendar_today'
      },
      {
        name: 'Settings',
        url: '/settings',
        iconName: 'settings'
      }
    ];
  }

  ngOnInit(): void {

  }

}
