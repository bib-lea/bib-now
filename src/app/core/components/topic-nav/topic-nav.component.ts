import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {PostDialogComponent} from '../../../shared/components/post-dialog/post-dialog.component';

@Component({
  selector: 'app-topic-nav',
  templateUrl: './topic-nav.component.html',
  styleUrls: ['./topic-nav.component.css']
})
export class TopicNavComponent implements OnInit {

  @Output() onTopicChange = new EventEmitter<string>();
  currentTopic: string;
  topics: any[] = [
    'Fundbüro',
    'Tutorium'
  ];

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.dialog.open(PostDialogComponent);
    if (!this.currentTopic)
    {
      this.currentTopic = this.topics[0];
      this.onTopicChange.emit(this.currentTopic);
    }
  }

  onPost(): void {
    this.dialog.open(PostDialogComponent);
  }

  onTopicClick(event): void {
    console.log('TOPIC_NAV: ' + event);
    this.currentTopic = event;
    this.onTopicChange.emit(event);
  }
}
