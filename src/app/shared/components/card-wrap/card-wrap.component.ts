import {Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Post} from '../../models/post';
import {ImageViewerComponent} from '../image-viewer/image-viewer.component';
import {FormControl} from '@angular/forms';
import {CrudService} from '../../services/crud.service';

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

  public options;
  @Input() posts: Post[];
  @Input() direction: EventEmitter<string>;

  constructor(
    private imageViewer: MatDialog,
    private crudService: CrudService
  )
  {
    this.crudService.getPost().subscribe(data => {
      this.posts = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Post;
        })
        console.log(this.posts);
    })
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
