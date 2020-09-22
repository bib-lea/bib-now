import { Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Post } from '../../models/post';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';
import { User } from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {CrudService} from '../../services/crud.service';

@Component({
  selector: 'app-card-wrap',
  templateUrl: './card-wrap.component.html',
  styleUrls: ['./card-wrap.component.css']
})
export class CardWrapComponent implements OnInit, OnChanges {
  // Zur Track-Slide-Animation
  currentActivePost: number;
  translateValue: number = 0;
  translateUnit: number = 19.5;
  get trackHorizontal(): any {
    return {
      'transform': `translateX(${this.translateValue}rem)`,
      'transition': 'transform 200ms ease'
    }
  }

  // Firebase
  user: User;
  userEmail: string;

  // Von ContentViewerComponent gefüttert
  @Input() posts: Post[];
  @Input() direction: EventEmitter<string>;

  constructor(
    private imageViewer: MatDialog,
    private afAuth: AngularFireAuth,
    private crudService: CrudService
  ){
    this.afAuth.onAuthStateChanged(user => {
      this.user = user;
      this.userEmail = user.email;
    })
  }

  ngOnInit(): void {
    this.direction.subscribe(dir => {
      if (dir === 'right' && this.currentActivePost !== (this.posts.length - 1)){
        this.currentActivePost++;
      }
      else if (dir === 'left' && this.currentActivePost !== 0){
        this.currentActivePost--;
      }

      this.resolveCurrentPosition();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const initialActive = 2;
    if (this.posts){
      this.posts.forEach(p => p.isHovered = false);
    }
    if (!this.currentActivePost){
      this.currentActivePost = initialActive;
    }
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

  onCardClick(index): void {
    this.currentActivePost = index;
    this.resolveCurrentPosition();
  }

  onDelete(id): void {
    this.crudService.deletePost(id);
  }

  private resolveCurrentPosition(): void {
    this.translateValue = (2 - this.currentActivePost) * this.translateUnit;
    console.log(this.currentActivePost);
  }

  private isSlideEnd(): boolean {
    return this.currentActivePost === 0
      || this.currentActivePost === this.posts.length - 1;
  }
}
