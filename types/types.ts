export interface IItem {
  id: string;
  name: string;
  description: string;
  price: number;
  img: string;
  imgThumb: string;
  createdAt: Date;
}

export type IShoppingCartItem = [IItem, number];
