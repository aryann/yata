import { Injectable } from '@angular/core';
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

  constructor() {}

  getLists(): Observable<List[]> {
    return of(this.fakeData);
  }
}
