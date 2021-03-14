import { Component, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { List } from '../types';
import { YataService } from '../yata.service';
import {
  CdkDrag,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { cloneDeep, isEqual } from 'lodash';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  list$: Observable<List>;
  newItem: string;
  newOwner: string;

  constructor(
    route: ActivatedRoute,
    private yataService: YataService,
    public auth: AuthService
  ) {
    this.list$ = yataService.getList(route.snapshot.paramMap.get('id') || '');
    this.newItem = '';
    this.newOwner = '';
  }

  ngOnInit(): void {}

  addNewItem(list: List): void {
    const text = this.newItem;
    if (text.length == 0) {
      return;
    }

    this.yataService.updateList(list.id!, (list) => {
      list.items!.push({
        text: text,
        isDone: false,
        createTime: new Date(),
      });
      return { items: list.items };
    });

    this.newItem = '';
  }

  grantPermission(list: List): void {
    const newOwner = this.newOwner;
    if (newOwner.length == 0) {
      return;
    }

    this.yataService.updateList(list.id!, (list) => {
      if (list.ownerEmails.includes(newOwner)) {
        return {};
      }

      list.ownerEmails.push(newOwner);
      return { ownerEmails: list.ownerEmails };
    });

    this.newOwner = '';
  }

  removePermission(list: List, email: string): void {
    this.yataService.updateList(list.id!, (list) => {
      const idx: number = list.ownerEmails.indexOf(email);
      const max = 1;
      list.ownerEmails.splice(idx, max);

      return { ownerEmails: list.ownerEmails };
    });
  }

  drop(list: List, event: CdkDragDrop<any[]>) {
    if (event.previousContainer !== event.container) {
      return;
    }
    const existingItems = cloneDeep(list.items);
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    this.yataService.updateList(list.id!, (currentList) => {
      if (!isEqual(existingItems, currentList.items)) {
        // There is no need to restore the state of the list because that
        // we are already watching the Firestore object.
        throw new Error('concurrent modification');
      }
      return { items: event.container.data };
    });
  }
}
