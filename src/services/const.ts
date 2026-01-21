export default class Const {
  // Routes
  static readonly PAGE_HOME: string = "/";
  static readonly PAGE_STORE: string = "/store";
  static readonly PAGE_STORE_ID: string = "/store/:id";
  static readonly PAGE_CART: string = "/cart";

  // Database Collection
  static readonly COLLECTION_NAME: string = "react-product-store";
  static readonly IMAGE_LOCATION: string =
    "https://www.imogenlay.com/projects/glasses-co/img/";

  // Fetch
  static readonly FETCH_PENDING = 0;
  static readonly FETCH_LOADING = 1;
  static readonly FETCH_SUCCESS = 2;
  static readonly FETCH_FAILURE = 3;

  // Display
  static readonly CHUNK_SIZE = 6;
}
