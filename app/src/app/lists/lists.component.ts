import { Component, OnInit } from '@angular/core';
import { YataService } from '../yata.service';
import { Observable } from 'rxjs';
import { List } from '../types';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  lists$: Observable<List[]>;
  newList: string;

  constructor(private yataService: YataService) {
    this.lists$ = yataService.getLists();
    this.newList = '';
  }

  ngOnInit(): void {}

  makeNewList() {
    this.yataService.makeNewList({ name: this.newList });
    this.newList = '';
  }
}
