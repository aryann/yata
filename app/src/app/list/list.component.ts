import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List } from '../types';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  list: List = {
    id: 'my-id',
    name: 'My List',
    items: [
      {
        id: '0',
        text: 'my first item',
        isDone: false,
      },
      {
        id: '1',
        text: 'my second item',
        isDone: true,
      },
    ],
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}

  getItems(): string {
    return this.route.snapshot.paramMap.get('id') || '';
  }
}
