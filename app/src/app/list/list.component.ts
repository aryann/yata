import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { List } from '../types';
import { YataService } from '../yata.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  list$: Observable<List>;
  newItem: string;

  constructor(route: ActivatedRoute, private yataService: YataService) {
    this.list$ = yataService.getList(route.snapshot.paramMap.get('id') || '');
    this.newItem = '';
  }

  ngOnInit(): void {}

  markItem(list: List, itemIndex: number) {
    list.items![itemIndex].isDone = !list.items![itemIndex].isDone;
    this.yataService.updateList(list);
  }

  deleteItem(list: List, itemIndex: number) {
    const max = 1;
    list.items!.splice(itemIndex, max);
    this.yataService.updateList(list);
  }

  addNewItem(list: List) {
    list.items!.push({
      text: this.newItem,
      isDone: false,
      createTime: new Date(),
    });
    this.yataService.updateList(list);
    this.newItem = '';
  }
}
