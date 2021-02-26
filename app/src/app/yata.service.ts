import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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

  getList(listId: string): Observable<any> {
    return this.firestore.collection('lists').doc(listId).valueChanges();
  }
}
