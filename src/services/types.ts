export interface Product {
  id: string;
  name: string;
  price: number;
  favourite: boolean;
  stock: StockItem[];
}

export interface StockItem {
  quantity: number;
  image: string;
  variant: string;
}
