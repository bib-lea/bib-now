import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(public fireservices: AngularFirestore) { }

  createPost( data){
    return this.fireservices.collection('Post').add(data);
  }

  getPost(){
    return this.fireservices.collection('Post').snapshotChanges();
  }

  updatePost(dataId, data){
    this.fireservices.doc('Post/' + dataId).update(data);
  }

  deletePost(dataId){
    this.fireservices.doc('Post/' + dataId).delete();
  }
}
