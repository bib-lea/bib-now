import { Component, OnInit } from '@angular/core';
import {CrudService} from '../../../shared/services/crud.service';
import { AuthServiceService } from '../../../shared/services/auth-service.service'
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Post } from "../../../shared/models/post";
import { Observable } from "rxjs";
import { AngularFireStorage} from "@angular/fire/storage";
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  form: FormGroup;

  

  downloadURL: Observable<string>;


  image: string
  topic: FormControl;
  content: FormControl;
  message: string;

  posts: Post[];

  constructor(private crudservice: CrudService, private auth: AuthServiceService, private storage: AngularFireStorage) { }



  ngOnInit(): void {

    this.topic = new FormControl('');
    this.content = new FormControl('');
    
    this.crudservice.getPost().subscribe(data => {

      this.posts = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Post;
      })
      console.log(this.posts);
    })
  }

create() {
  const postData = {
    //author: this.auth.authState.displayName || this.auth.authState.email,
    author: '',
    //authorId: this.auth.currentUserId,
    authorId: '',
    content: this.content.value,
    image: this.image || null,
    published: new Date(),
    topic: this.topic.value
  }
  this.crudservice.createPost(postData).then(res => {
    this.topic.reset();
    this.content.reset();
    this.image = '';
    console.log(res);
    this.message = "saved your post";
  })

}

update(post: Post) {
  this.crudservice.updatePost(post);
}

delete(id: string) {
  this.crudservice.deletePost(id);
}

upload(event) {
  var n = Date.now();
  const file = event.target.files[0];
  const filePath = `posts/${n}`;
  const fileRef = this.storage.ref(filePath);
  const task = this.storage.upload(`posts/${n}`, file);
  task
    .snapshotChanges()
    .pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(url => {
          if (url) {
            this.image = url;
          }
          console.log(this.image);
        });
      })
    )
    .subscribe(url => {
      if (url) {
        console.log(url);
      }
    });


  // createRecord(){
  //   let record = {
  //     name: this.topic.value,
  //     content: this.content.value
  //   };
   
  //   this.crudservice.createPost(record).then(res => {

  //     this.topic.reset();
  //     this.content.reset();
  //     console.log(res);
  //     this.message = "saved your post";
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   }
  //   );
    
  // }

  // editRecord(record){
  //   record.isedit = true;
  //   record.editname = record.name;
  //   record.editcontent = record.content;
  // }

  // updateRecord(recorddata){
  //   let record = {};
  //   record['name'] = recorddata.editname;
  //   record['content'] = recorddata.editcontent;
  //   this.crudservice.updatePost(recorddata.id, record);
  //   recorddata.isedit = false;
  // }

  // deleteRecord(record_id)
  // {
  //   this.crudservice.deletePost(record_id);
  // }

}}
