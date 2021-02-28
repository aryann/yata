import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { List, Item } from './types';

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

  makeNewList(list: List) {
    list.ownerUids = [this.auth.uid];
    list.test = this.auth.uid;
    this.listsRef().add(list);
  }

  getList(listId: string): Observable<any> {
    return this.listRef(listId).valueChanges({ idField: 'id' });
  }

  updateList(list: List) {
    // TODO: Make this transactional.
    this.listRef(list.id!).update(list);
  }

  private listsRef(): AngularFirestoreCollection<List> {
    return this.firestore.collection<List>('lists');
  }

  private listRef(listId: string): AngularFirestoreDocument<List> {
    return this.listsRef().doc(listId);
  }
}
