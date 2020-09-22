import {Output, ViewChild} from '@angular/core';
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
  @Output() posts: Post[];
  @Output() direction = new EventEmitter<string>();
  @Output() filteredPosts: Post[];

  constructor(
    private afAuth: AngularFireAuth,
    private crudService: CrudService
  ) {
    this.crudService.getPost().subscribe(data => {
      this.posts = data.map(e => {
        console.log(e);
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Post
      })
    });
  }

  ngOnInit(): void {
  }

  onTopicChange(event): void {
    this.currentTopic = event;
    this.filteredPosts = this.posts;
    console.log('Topic changed: ' + event);
    //console.log(this.filteredPosts);
  }

  onDirectionChange(event): void {
    console.log('Direction changed:' + event);
    this.direction.emit(event);
  }
}
