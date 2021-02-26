export interface List {
  id: string;
  name: string;
  items: Item[];
}

export interface Item {
  text: string;
  isDone: boolean;
}
