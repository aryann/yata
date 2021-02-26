import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { List, Item } from './types';

@Injectable({
  providedIn: 'root',
})
export class YataService {
  constructor(private firestore: AngularFirestore) {}

  getLists(): Observable<List[]> {
    return this.listsRef().valueChanges({ idField: 'id' });
  }

  makeNewList(list: List) {
    this.listsRef().add(list);
  }

  getList(listId: string): Observable<any> {
    return this.listRef(listId).valueChanges({ idField: 'id' });
  }

  updateList(list: List) {
    this.listRef(list.id).update(list);
  }

  private listsRef(): AngularFirestoreCollection<List> {
    return this.firestore.collection<List>('lists');
  }

  private listRef(listId: string): AngularFirestoreDocument<List> {
    return this.listsRef().doc(listId);
  }
}
