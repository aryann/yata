import { Component, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
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

  addNewItem(list: List) {
    const text = this.newItem;
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
}
