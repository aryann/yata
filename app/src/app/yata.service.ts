import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { List } from './types';

@Injectable({
  providedIn: 'root',
})
export class YataService {
  fakeData: List[] = [
    { id: 'my-list', name: 'My List', items: [] },
    { id: 'my-list-2', name: 'My List 2', items: [] },
  ];

  constructor(private firestore: AngularFirestore) {}

  getLists(): Observable<List[]> {
    return this.firestore
      .collection<List>('lists')
      .valueChanges({ idField: 'id' });
  }
}
