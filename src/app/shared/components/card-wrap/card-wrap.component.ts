import {Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Post} from '../../models/post';
import {ImageViewerComponent} from '../image-viewer/image-viewer.component';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {CAROUSEL_OPTIONS} from '../../constants/constants';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-card-wrap',
  templateUrl: './card-wrap.component.html',
  styleUrls: ['./card-wrap.component.css']
})
export class CardWrapComponent implements OnInit {

  translateValue: number = 0;
  get trackHorizontal(): any {
    return {
      'transform': `translateX(${this.translateValue}rem)`,
      'transition': 'transform 200ms ease'
    }
  }

  public options: OwlOptions;
  @Input() posts: Post[];
  @Input() direction: EventEmitter<string>;

  constructor(
    private imageViewer: MatDialog
  )
  {
    this.options = CAROUSEL_OPTIONS;
    //console.log('CARD_WRAP: '+ this.posts);
  }

  ngOnInit(): void {
    console.log(this.direction);
    this.direction.subscribe(dir => {
      console.log(dir);
      dir === 'right' ?
        this.translateValue -= 20 :
        this.translateValue += 20;
    });
  }

  onImageView(url): void {
    console.log(url);
    let ref = this.imageViewer.open(ImageViewerComponent, {
      data: {
        overflow: 'hidden',
        padding: 0,
        imgUrl: url
      }
    })
  }
}
