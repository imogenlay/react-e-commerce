import { BrowserRouter, Route, Routes } from "react-router";
import NavBar from "./component/NavBar/NavBar";
import HomePage from "./pages/HomePage";
import AllProductsPage from "./pages/AllProductsPage/AllProductsPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import Const from "./services/const";
import "./index.scss";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path={Const.PAGE_HOME} element={<HomePage />} />
        <Route path={Const.PAGE_STORE} element={<AllProductsPage />} />
        <Route path={Const.PAGE_STORE_ID} element={<ProductPage />} />
        <Route path={Const.PAGE_CART} element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
}
