import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(public fireservices: AngularFirestore) { }

  createPost( data: any ){
    return this.fireservices.collection('Post').add(data);
  }

  getPost(){
    return this.fireservices.collection('Post').snapshotChanges();
  }

  updatePost(dataId: any, data: any){
    this.fireservices.doc('Post/' + dataId).update(data);
  }

  deletePost(dataId: any){
    this.fireservices.doc('Post/' + dataId).delete();
  }
}
