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

  constructor(route: ActivatedRoute, private yataService: YataService) {
    this.list$ = yataService.getList(route.snapshot.paramMap.get('id') || '');
  }

  ngOnInit(): void {}

  mark(list: List, itemIndex: number) {
    list.items[itemIndex].isDone = !list.items[itemIndex].isDone;
    this.yataService.updateList(list);
  }
}
