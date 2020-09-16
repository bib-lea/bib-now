import { Component, OnInit } from '@angular/core';
import {CrudService} from '../../../shared/services/crud.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  form: FormGroup;

  post: any;
  username: FormControl;
  content: FormControl;
  message: string;

  constructor(public crudservice: CrudService, public fb: FormBuilder) { }



  ngOnInit(): void {

    this.username = new FormControl('');
    this.content = new FormControl('');
    
    this.crudservice.getPost().subscribe(data => {

      this.post = data.map(e => {
        return {
          id: e.payload.doc.id,
          isedit: false,
          name: e.payload.doc.data()['name'],
          content: e.payload.doc.data()['content']
        };
      })
      console.log(this.post);
    })
  }

  createRecord(){
    let record = {
      name: this.username.value,
      content: this.content.value
    };
   
    this.crudservice.createPost(record).then(res => {

      this.username.reset();
      this.content.reset();
      console.log(res);
      this.message = "saved your post";
    })
    .catch(error => {
      console.log(error);
    }
    );
    
  }

  editRecord(record){
    record.isedit = true;
    record.editname = record.name;
    record.editcontent = record.content;
  }

  updateRecord(recorddata){
    let record = {};
    record['name'] = recorddata.editname;
    record['content'] = recorddata.editcontent;
    this.crudservice.updatePost(recorddata.id, record);
    recorddata.isedit = false;
  }

  deleteRecord(record_id)
  {
    this.crudservice.deletePost(record_id);
  }

}
