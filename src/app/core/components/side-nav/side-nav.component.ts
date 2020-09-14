import { Component, OnInit } from '@angular/core';
import { NavigationLink } from '../../../shared/models/navigation-link';
import { NAV_LINKS } from '../../../shared/constants/constants';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  navLinks: NavigationLink[];

  constructor() {
    this.navLinks = NAV_LINKS;
  }

  ngOnInit(): void {

  }

}
