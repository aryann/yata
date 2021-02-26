export interface List {
  id: string;
  name: string;
  items: Item[];
}

export interface Item {
  id: string;
  text: string;
  isDone: boolean;
}
