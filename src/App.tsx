import { BrowserRouter, Route, Routes } from "react-router";
import "./index.scss";
import Const from "./services/const";
import NavBar from "./component/NavBar/NavBar";
import CartPage from "./pages/CartPage/CartPage";
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";
import Background from "./component/Background/Background";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import AllProductsPage from "./pages/AllProductsPage/AllProductsPage";

export default function App() {
  return (
    <>
      <Background />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path={Const.PAGE_HOME} element={<HomePage />} />
          <Route path={Const.PAGE_CART} element={<CartPage />} />
          <Route path={Const.PAGE_CART_ID} element={<CartPage />} />
          <Route path={Const.PAGE_STORE} element={<AllProductsPage />} />
          <Route path={Const.PAGE_STORE_ID} element={<ProductPage />} />
          <Route path={Const.PAGE_CHECKOUT} element={<CheckoutPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
