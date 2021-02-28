import { Component, Input, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import { Item, List } from '../types';
import { YataService } from '../yata.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() list: List | null = null;
  @Input() index: number | null = null;
  showDetails: boolean = false;

  constructor(private yataService: YataService) {}

  ngOnInit(): void {}

  markItem() {
    this.yataService.updateList(this.list!.id!, (list) => {
      list.items![this.index!].isDone = !list.items![this.index!].isDone;
      return { items: list.items };
    });
  }

  deleteItem() {
    this.yataService.updateList(this.list!.id!, (list) => {
      const max = 1;
      list.items!.splice(this.index, max);
      return { items: list.items };
    });
  }

  get item(): Item {
    return this.list!.items[this.index!];
  }

  get createTime(): Date {
    return ((this.item
      .createTime as unknown) as firebase.firestore.Timestamp).toDate();
  }
}
