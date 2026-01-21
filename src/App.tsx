import { BrowserRouter, Route, Routes } from "react-router";
import NavBar from "./component/NavBar/NavBar";
import HomePage from "./pages/HomePage/HomePage";
import AllProductsPage from "./pages/AllProductsPage/AllProductsPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import CartPage from "./pages/CartPage";
import Const from "./services/const";
import "./index.scss";
import Background from "./component/Background/Background";
import { CartProvider } from "./component/CartContext/CartContextProvider";

export default function App() {
  return (
    <>
      <Background />
      <CartProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path={Const.PAGE_HOME} element={<HomePage />} />
            <Route path={Const.PAGE_CART} element={<CartPage />} />
            <Route path={Const.PAGE_CART_ID} element={<CartPage />} />
            <Route path={Const.PAGE_STORE} element={<AllProductsPage />} />
            <Route path={Const.PAGE_STORE_ID} element={<ProductPage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  );
}
