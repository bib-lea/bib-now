import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Post } from "../models/post";
import { map } from 'rxjs/operators';
import { User } from 'firebase';
import {Observable} from 'rxjs';

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


  updatePost(id: string, formData) {
    return this.getPostFromId(id).update(formData)
  }

  updateUser(id: string, formData) {
    return this.fireservices.doc<User>(`users/${id}`).update(formData);
  }

  getUserById(id: string): Observable<User> {
    return this.fireservices.doc<User>(`users/${id}`).valueChanges();
  }

  deletePost(postId: string){
    this.fireservices.doc('posts/' + postId).delete(); //delete
  }
}
