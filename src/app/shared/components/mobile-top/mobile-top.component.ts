import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-top',
  templateUrl: './mobile-top.component.html',
  styleUrls: ['./mobile-top.component.css']
})
export class MobileTopComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onPost(): void {
    console.log('test');
  }
}
