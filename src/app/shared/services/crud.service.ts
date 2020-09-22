import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Post } from "../models/post";
import { map } from 'rxjs/operators';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  postsCollection: AngularFirestoreCollection<Post>
  postDoc: AngularFirestoreDocument<Post>
  usersCollection: AngularFirestoreCollection<User>


  constructor(public fireservices: AngularFirestore) {
    this.postsCollection = this.fireservices.collection('posts', ref => ref.orderBy('datePosted', 'desc'));
    this.usersCollection = this.fireservices.collection('users');
  }

  //CRUD

  createPost( post: Post ){
    return this.fireservices.collection('posts').add(Object.assign({}, post)); //create
  }

  getPost(){
    return this.postsCollection.snapshotChanges();
  }

  getPostFromId(id: string) {
    return this.fireservices.doc<Post>(`posts/${id}`)
  }


  update(id: string, formData) {
    return this.getPostFromId(id).update(formData)
  }


  deletePost(postId: string){
    this.fireservices.doc('posts/' + postId).delete(); //delete
  }
}
