import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(public fireservices: AngularFirestore) { }

  //CRUD
  
  createPost( data: any ){
    return this.fireservices.collection('posts').add(data); //create
  }

  getPost(){
    return this.fireservices.collection('posts').snapshotChanges(); //read
  }

  updatePost(dataId: any, data: any){
    this.fireservices.doc('posts/' + dataId).update(data); //update
  }

  deletePost(dataId: any){
    this.fireservices.doc('posts/' + dataId).delete(); //delete
  }
}
