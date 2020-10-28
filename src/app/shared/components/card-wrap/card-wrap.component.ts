import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Post } from '../../models/post';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';
import { User } from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {CrudService} from '../../services/crud.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import {animate, keyframes, query, stagger, state, style, transition} from '@angular/animations';
import { trigger } from '@angular/animations';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-card-wrap',
  templateUrl: './card-wrap.component.html',
  styleUrls: ['./card-wrap.component.css'],
  animations: [
    trigger('cardsEnter', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', stagger('300ms', [
          animate('200ms ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(55px)', offset: 0 }),
            style({ opacity: .2, transform: 'translateY(-15px)', offset: 0.3 }),
            style({ opacity: .3, transform: 'translateY(0)', offset: 1 }),
          ]))]), { optional: true })
      ]),
    ])
  ]
})
export class CardWrapComponent implements OnInit, OnChanges {
  // Zur Track-Slide-Animation
  currentActivePost: number;
  translateValue: number = 0;
  translateUnit: number = 21;
  get trackHorizontal(): any {
    return {
      'transform': `translateX(${this.translateValue}rem)`,
      'transition': 'transform 200ms ease'
    }
  }

  // Firebase
  user: User;
  userEmail: string;
  username: string;

  // Sliced Posts
  displayedPosts: Post[] = [];
  startIndex: number;
  maximalDisplayed: number;

  // Von ContentViewerComponent gefüttert
  @Input() posts: any;
  _posts: Post[];
  @Input() currentPage: any;
  @Input() direction: any;
  @Input() isMobile: boolean;

  constructor(
    private dialog: MatDialog,
    private afAuth: AngularFireAuth,
    private crudService: CrudService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.startIndex = 0;
    this.maximalDisplayed = 5;
    // Auth Sub
    this.afAuth.onAuthStateChanged(user => {
      this.user = user;
      this.userEmail = user.email;
    });
    // Content Sub
    this.posts.subscribe(posts => {
      let endIndex = this.startIndex + this.maximalDisplayed;
      this._posts = posts;
      if (this.isMobile)
      {
        this.maximalDisplayed = this._posts.length;
      }
      else
      {
        this.maximalDisplayed = 5;
      }

      this.displayedPosts = this._posts.slice(this.startIndex, endIndex);
      this.setInitialActive();
    });
    // Direction Sub (von ContentViewer)
    if (this.direction){
      this.direction.subscribe(dir => {
        if (dir === 'right' && this.currentActivePost !== (this.displayedPosts.length - 1)){
          this.currentActivePost++;
        }
        else if (dir === 'left' && this.currentActivePost !== 0){
          this.currentActivePost--;
        }
        this.resolveCurrentPosition();
      });
    }
    // Page Sub (von ContentViewer)
    if (this.currentPage){
      this.currentPage.subscribe(page => {
        console.log(page);
        this.startIndex = page * this.maximalDisplayed;
        if (this._posts){
          this.displayedPosts = this._posts.slice(this.startIndex, this.startIndex + this.maximalDisplayed);
          this.setInitialActive();
        }
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Position
    const initialActive = 2;
    if (this.posts){
      this.posts.forEach(p => p.isHovered = false);
    };

  }

  onImageView(url): void {
    let ref = this.dialog.open(ImageViewerComponent, {
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
    const ref = this.dialog.open(ConfirmationDialogComponent);
    ref.afterClosed().subscribe(res => {
      if (res === 'confirmed'){
        this.crudService.deletePost(id);
      }
    });
  }

  onCopy(): void {
    let listener = (e: ClipboardEvent) => {
      let clipboard = e.clipboardData || window['clipboardData'];
      clipboard.setData('text', this._posts[this.currentActivePost].userEmail);
      e.preventDefault();
    };

    document.addEventListener('copy', listener, false);
    document.execCommand('copy');
    document.removeEventListener('copy', listener, false);

    this.snackBar.open('In der Zwischenablage gespeichert.', 'Schließen', {
      duration: 3000,
    })
  }

  private resolveCurrentPosition(): void {
    if (this.displayedPosts.length < 5)
      return;

    this.translateValue = (2 - this.currentActivePost) * this.translateUnit;
  }

  private setInitialActive(): void {
    let centerIndex = Math.floor(this.displayedPosts.length / 2.0);
    if (this.displayedPosts && centerIndex >= 0) {
      this.currentActivePost = centerIndex;
    }
    else {
      this.currentActivePost = 0;
    }

    // Bring zum Start zurück
    this.translateValue = 0;
  }

  getTempName(post: Post): string {
    const [ firstname, lastname ] = post.userEmail.split('@')[0].split('.');
    return firstname[0].toUpperCase() + firstname.slice(1) + ' ' + lastname[0].toUpperCase() + lastname.slice(1);
  }
}
