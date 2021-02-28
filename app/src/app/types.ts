export interface List {
  id?: string;
  name: string;
  items?: Item[];
  ownerUids?: string[];
  test?: string;
}

export interface Item {
  text: string;
  isDone: boolean;
}
