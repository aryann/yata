export interface List {
  id?: string;
  name: string;
  items: Item[];
  ownerUids?: string[];
}

export interface Item {
  text: string;
  isDone: boolean;
  createTime: Date;
}
