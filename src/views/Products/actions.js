import 'whatwg-fetch';
import config from '../../config/config';

// TODO refactor
let WooCommerceAPI = require('woocommerce-api');

var WooCommerce = new WooCommerceAPI({
  url: 'http://localhost:8080/wordpress',
  consumerKey: 'ck_f6ccad0c8d5a0b4351cd8537d615d485e994e9b0',
  consumerSecret: 'cs_61aca3bc24f6f755051ce0e571aa9a448eb8132d',
  wpAPI: true,
  version: 'wc/v1'
});

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';

export const requestProducts = () => ({
  type: REQUEST_PRODUCTS,
});

export const receiveProducts = products => ({
  type: RECEIVE_PRODUCTS,
  products,
});

export const fetchProducts = (params = {}) => (dispatch) => {
  console.log("fetch products")
  dispatch(requestProducts());
  
  //TODO remove this
  return WooCommerce.getAsync("products")
    .then((response) => {
      console.log("Response: " + JSON.parse(response.body));
      dispatch(receiveProducts(JSON.parse(response.body)))
    })
    .catch((error) => {
      console.log("Error: " + error.response.data);
    });
  
    let url;
  if (params && params.id) {
    url = config.API_PRODUCT_URL + String(params.id);
  } else {
    url =
      config.API_PRODUCTS_URL +
      '?' +
      Object.keys(params)
        .map(k => k + '=' + encodeURIComponent(params[k]))
        .join('&');
  }

  // return fetch(url)
  //   .then(response => response.json())
  //   .then(json => dispatch(receiveproducts(json)))
  //   .catch(() => {
  //     dispatch(receiveproducts([]));
  //   });

};
