export interface Product {
  documentType: string;
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

export interface Cart {
  id: string;
  documentType: string;
  cartItems: CartItem[];
}

export interface CartItem {
  productStockID: string;
  count: number;
  price: number;
}
