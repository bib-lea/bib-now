import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-nav',
  templateUrl: './post-nav.component.html',
  styleUrls: ['./post-nav.component.css']
})
export class PostNavComponent implements OnInit {

  @Output() public direction = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
}
