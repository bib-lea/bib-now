import {Output, ViewChild} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { Post } from 'src/app/shared/models/post';
import {CrudService} from '../../../shared/services/crud.service';
import {Observable} from 'rxjs';
import {TEST_POSTS} from '../../../shared/constants/constants';
import {PostNavComponent} from '../../../shared/components/post-nav/post-nav.component';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-content-viewer',
  templateUrl: './content-viewer.component.html',
  styleUrls: ['./content-viewer.component.css']
})
export class ContentViewerComponent implements OnInit {

  posts: Post[];
  currentTopic: string;
  @Output() direction = new EventEmitter<string>();
  @Output() filteredPosts: Post[];

  @ViewChild('postNav') postNav: PostNavComponent;

  constructor(
    private afAuth: AngularFireAuth,
    private crudService: CrudService
  ) { }

  ngOnInit(): void {
    this.posts = TEST_POSTS;
    this.filteredPosts = this.posts;
  }

  onTopicChange(event): void {
    this.currentTopic = event;
    this.filteredPosts = this.posts;
    console.log('CONTENT_VIEWER: ' + event);
    //console.log(this.filteredPosts);
  }

  onDirectionChange(event): void {
    console.log('CONTENT_VIEWER:' + event);
    this.direction.emit(event);
  }
}
