export interface Product {
  id: string;
  name: string;
  price: number;
  favourite: boolean;
  order: number;
  stock: StockItem[];
}

export interface StockItem {
  quantity: number;
  image: string;
  color: string;
  variant: string;
}

export interface CarouselItem {
  image: string;
}
