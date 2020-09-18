import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Post } from "../models/post";

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  postsCollection: AngularFirestoreCollection<Post>
  postDoc: AngularFirestoreDocument<Post>


  constructor(public fireservices: AngularFirestore) {
    this.postsCollection = this.fireservices.collection('posts', ref => ref.orderBy('published', 'desc'));
  }

  //CRUD
  
  createPost( data: any ){
    return this.fireservices.collection('posts').add(Object.assign({}, data)); //create
  }

  getPost(){
    return this.fireservices.collection('posts').snapshotChanges(); //read
  }

  updatePost(dataId: any, data: any){
    this.fireservices.doc('posts/' + dataId).update(Object.assign({}, data)); //update
  }

  deletePost(dataId: any){
    this.fireservices.doc('posts/' + dataId).delete(); //delete
  }
}
