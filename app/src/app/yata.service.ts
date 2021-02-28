import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentData,
} from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { List } from './types';

@Injectable({
  providedIn: 'root',
})
export class YataService {
  constructor(private firestore: AngularFirestore, private auth: AuthService) {}

  getLists(): Observable<List[]> {
    return this.firestore
      .collection<List>('lists', (ref) => {
        console.log(this.auth.uid);
        return ref
          .where('ownerUids', 'array-contains', this.auth.uid)
          .orderBy('name');
      })
      .valueChanges({ idField: 'id' });
  }

  makeNewList(list: List): void {
    list.ownerUids = [this.auth.uid];
    this.listsRef().add(list);
  }

  getList(listId: string): Observable<any> {
    return this.listsRef().doc(listId).valueChanges({ idField: 'id' });
  }

  updateList(
    id: string,
    updateFn: (list: DocumentData) => firebase.firestore.UpdateData
  ): void {
    const ref = this.firestore.firestore.collection('lists').doc(id);
    this.firestore.firestore.runTransaction(
      async (txn: firebase.firestore.Transaction) => {
        const list = await txn.get<DocumentData>(ref);
        if (!list.exists) {
          console.log('error');
          return;
        }
        txn.update(ref, updateFn(list.data()!));
      }
    );
  }

  private listsRef(): AngularFirestoreCollection<List> {
    return this.firestore.collection<List>('lists');
  }
}
