import { Injectable } from '@angular/core';
import {
  AngularFirestore,
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
    return this.firestore
      .collection<List>('lists')
      .valueChanges({ idField: 'id' });
  }

  private listRef(listId: string): AngularFirestoreDocument<List> {
    return this.firestore.collection('lists').doc(listId);
  }

  getList(listId: string): Observable<any> {
    return this.listRef(listId).valueChanges({ idField: 'id' });
  }

  updateList(list: List) {
    this.listRef(list.id).update(list);
  }
}
