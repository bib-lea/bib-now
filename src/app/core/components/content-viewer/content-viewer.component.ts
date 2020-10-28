import {Input, Output, ViewChild} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { Post } from 'src/app/shared/models/post';
import {CrudService} from '../../../shared/services/crud.service';
import { EventEmitter } from '@angular/core';
import { User } from 'firebase';

@Component({
  selector: 'app-content-viewer',
  templateUrl: './content-viewer.component.html',
  styleUrls: ['./content-viewer.component.css']
})
export class ContentViewerComponent implements OnInit {

  currentTopic: string;
  posts: Post[] = [];

  @Input() search: EventEmitter<string>;
  @Input() isMobile: boolean;
  
  @Output() mobileMode: boolean;
  @Output() isSearching = new EventEmitter<boolean>();
  @Output() direction = new EventEmitter<string>();
  @Output() currentPage = new EventEmitter<number>();
  @Output() filteredPosts = new EventEmitter<Post[]>();
  @Output() pagesCount = new EventEmitter<number>();
  _filteredPostsCount: number;

  constructor(
    private afAuth: AngularFireAuth,
    private crudService: CrudService
  ) {
    this.crudService.getPost().subscribe(data => {
      this.posts = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Post
      });
      this.emitPostsByTopic();
    });
  }

  ngOnInit(): void {
    // Search Sub
    this.search.subscribe(val => {
      if (val && val.length > 2){
        const keyword = val.toLowerCase();
        const filtered = this.posts.filter(p =>
            (p.title.toLowerCase().includes(val)
              || p.content.toLowerCase().includes(val)
              || p.userEmail.toLowerCase().includes(val))
            && p.topic === this.currentTopic);
        this._filteredPostsCount = filtered.length;
        this.filteredPosts.emit(filtered);
        this.updatePagesCount();
      } else {
        this.emitPostsByTopic();
      }
    });
    this.mobileMode = this.isMobile;
  }

  onTopicChange(event): void {
    this.currentTopic = event;
    this.emitPostsByTopic();
  }

  onDirectionChange(event): void {
    console.log('Direction changed:' + event);
    this.direction.emit(event);
  }

  onPageChange(event): void {
    this.currentPage.emit(event);
  }

  private emitPostsByTopic(): void {
    let filtered = this.posts.filter(p => p.topic === this.currentTopic);
    this._filteredPostsCount = filtered.length;
    this.filteredPosts.emit(filtered);
    this.updatePagesCount();
  }

  private updatePagesCount(): void {
    this.pagesCount.emit(Math.ceil(this._filteredPostsCount / 5));
  }
}
