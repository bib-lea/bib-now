import { Component, OnInit } from '@angular/core';
import {NavigationLink} from '../../models/navigation-link';
import {NAV_LINKS} from '../../constants/constants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  links: NavigationLink[];

  constructor(
    private router: Router
  )
  {
    this.links = NAV_LINKS;
  }

  ngOnInit(): void {
  }

  onNavClick(url): void {
    this.router.navigateByUrl(url);
  }
}
