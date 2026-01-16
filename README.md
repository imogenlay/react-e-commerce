# React e-cShop Website

## Outline

This project is designed to reinforce your React learnings and make sure that you are comfortable with most aspect of the framework.
With this project you will practice how to:

- Fetch Data within a React App
- Use react-router
- Use Firebase/Firestore

## MVP

At a minimum your e-shop website should have Three pages:

- Home Page
  - This will contain:
    - A Grid of products
    - Carousel of featured products
- Product Page (with id parameter) Similar to a product page on another site, allows you to add to cart and select product variants
  - All products should be stored in Firestore:
  - You should store the following information:
    - quantity
    - variants (could be colors, sizes, etc)
    - price per unit
    - name
    - image url
    - favourited or not (boolean)
      All data should be stored in Firestore and fetched by the frontend, there should be NO static product data in the react application
- Cart
  - A list of all products added to the user's cart and a total price
  - You should not be able to add more items than are in stock to the cart
  - You may want to adjust quantity of products from the Cart page
  - You should be able to remove products from the cart

## Bonus

- You may want to add tests with React Testing Library

- You may want to use TypeScript (only if you feel very confident)

- Implement Stripe "Payment" with a developer account

- TIPS :

1. Make sure your site is scoped to one category of products
2. When stripe is in test mode you can use `4242 4242 4242 4242` as a valid credit card number.

**IMPORTANT** - Make sure your api key is only a test key so people can't use it to actually take payment

- If stripe is too difficult a button that says "buy" which clears the cart and removes those items from qty is fine

## Useful links

- [React Router Docs ](https://reactrouter.com/start/declarative/installation)
- [FireStore Docs](https://firebase.google.com/docs/firestore)
