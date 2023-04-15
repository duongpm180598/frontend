import { APIClient } from '../../helper/api_helper';
import { fetchCart } from '../cart.slice';
import { fetchCategory } from '../category.slice';
import { fetchProducts } from '../products.slice';
import { fetchVariantAttribute } from '../variantAttribute.slice';

const fetchingCategoryAndAttribute =
  (params = {}) =>
  async (dispatch) => {
    const url_category = `${process.env.REACT_APP_API_URL}/categories`;
    const url_attribute = `${process.env.REACT_APP_API_URL}/attributes`;

    const promiseCategory = new APIClient().getWithToken(url_category, params);
    const promiseAtribute = new APIClient().getWithToken(url_attribute, params);

    const response = await Promise.all([promiseCategory, promiseAtribute]);
    dispatch(fetchCategory(response[0]));
    dispatch(fetchVariantAttribute(response[1]));
  };

const fetchingProducts =
  (params = {}) =>
  async (dispatch) => {
    const url_products = `${process.env.REACT_APP_API_URL}/products`;
    const response = await new APIClient().getWithToken(url_products, params);
    dispatch(fetchProducts(response));
  };

const fetchingCart =
  (params = {}) =>
  async (dispatch) => {
    const url_cart = `${process.env.REACT_APP_API_URL}/cart-items`;
    const response = await new APIClient().getWithToken(url_cart, params);
    const formatResponse = response.map((x) => {
      const [size, color] = x.attributes;
      return {
        id: x.id,
        name: x.name,
        quantity: x.quantity,
        thumbnail: x.thumbnail,
        unit_price: x.unit_price,
        size: size.value,
        color: color.value,
      };
    });
    dispatch(fetchCart(formatResponse));
  };

const fetchingData = () => async (dispatch) => {
  const url_cart = `${process.env.REACT_APP_API_URL}/cart-items`;
  const url_products = `${process.env.REACT_APP_API_URL}/products`;
  const promiseProduct = new APIClient().getWithToken(url_products);
  const promiseCart = new APIClient().getWithToken(url_cart);
  const response = await Promise.all([promiseProduct, promiseCart]);

  console.log('promise[0] ::', response[0]);
  console.log('promise[0] ::', response[1]);

  // format Data

  const formatResponse = response[1].map((x) => {
    const [size, color] = x.attributes;
    return {
      id: x.id,
      name: x.name,
      quantity: x.quantity,
      thumbnail: x.thumbnail,
      unit_price: x.unit_price,
      size: size.value,
      color: color.value,
    };
  });

  dispatch(fetchProducts(response[0]));
  dispatch(fetchCart(formatResponse));

  // const response = await Promise.all([promiseCategory, promiseAtribute]);
};

export { fetchingCategoryAndAttribute, fetchingProducts, fetchingCart, fetchingData };
