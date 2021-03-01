export interface List {
  id?: string;
  name: string;
  items: Item[];
  ownerEmails?: string[];
}

export interface Item {
  text: string;
  isDone: boolean;
  createTime: Date;
}
