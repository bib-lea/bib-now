import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-post-nav',
  templateUrl: './post-nav.component.html',
  styleUrls: ['./post-nav.component.css']
})
export class PostNavComponent implements OnInit {

  @Output() public direction = new EventEmitter<string>();
  @Output() public currentPage = new EventEmitter<number>();
  @Input() public pagesCount: any;
  _pagesCount: number;
  _currentPage: number;

  hasNoData: boolean = false;

  constructor(
  ) {}

  ngOnInit(): void {
    this.pagesCount.subscribe(count => {
      this._pagesCount = count;
      this._pagesCount === 0 ? this.hasNoData = false : this.hasNoData = true;
      this.onPageChange(0);
    });

    if (!this._currentPage) {
      this._currentPage = 0;
    }
    this.currentPage.emit(this._currentPage);
    this.direction.emit('');
  }

  onPageChange(i: number) {
    this._currentPage = i;
    this.currentPage.emit(this._currentPage);
  }

  counter(i: number) {
    return new Array(i);
  }
}
