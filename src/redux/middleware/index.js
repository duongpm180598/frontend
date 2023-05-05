import { APIClient } from '../../helper/api_helper';
import { fetchProvinces } from '../GHN.slice';
import { fetchCart, fetchQuantity } from '../cart.slice';
import { fetchCategory } from '../category.slice';
import { fetchOrder } from '../order.slice';
import { fetchProducts } from '../products.slice';
import { statusPending, statusResolve } from '../status.slice';
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
    dispatch(statusPending());
    const response = await new APIClient().getWithToken(url_cart, params);
    let totalProducts = 0;
    const formatResponse = response.items.map((x) => {
      const [size, color] = x.attributes;
      totalProducts += x.quantity;
      return {
        id: x.id,
        variant_id: x.variant_id,
        name: x.name,
        weight: x.weight,
        quantity: x.quantity,
        thumbnail: x.thumbnail,
        unit_price: x.unit_price,
        size: size.value,
        color: color.value,
      };
    });
    dispatch(statusResolve());
    dispatch(fetchQuantity(totalProducts));
    dispatch(fetchCart({ products: formatResponse }));
  };

const fetchingData = (params) => async (dispatch) => {
  let quantity = 0;
  const url_cart = `${process.env.REACT_APP_API_URL}/cart-items`;
  const url_products = `${process.env.REACT_APP_API_URL}/products`;
  const promiseProduct = new APIClient().getWithToken(url_products, params);
  const promiseCart = new APIClient().getWithToken(url_cart);
  dispatch(statusPending());
  const response = await Promise.all([promiseProduct, promiseCart]);
  response[1].items.forEach((x) => {
    quantity += x.quantity;
  });
  dispatch(statusResolve());
  dispatch(fetchProducts(response[0].products));

  dispatch(fetchQuantity(quantity));
};

const fetchingDataGHN = () => async (dispatch) => {
  const url_province = `${process.env.REACT_APP_API_URL}/ghn/provinces`;
  const response = await new APIClient().getWithToken(url_province);
  dispatch(fetchProvinces(response));
};

const fetchingOrder = (params) => async (dispatch) => {
  const url_order = `${process.env.REACT_APP_API_URL}/orders`;
  dispatch(statusPending());
  const response = await new APIClient().getWithToken(url_order, params);
  dispatch(statusResolve());
  const dataFormat = response.orders.map((x) => {
    return {
      code: x.code,
      status: x.status,
      created_at: x.created_at,
      thumbnail: x.order_items[0].thumbnail,
      tracking: {
        customer_name: x.tracking.customer_name,
        customer_email: x.tracking.customer_email,
        customer_phone: x.tracking.customer_phone,
        province: x.tracking.province,
        district: x.tracking.district,
        ward: x.tracking.ward,
        line: x.tracking.line,
      },
      payment: {
        gateway: x.payment.gateway,
        amount: x.payment.amount,
      },
    };
  });
  dispatch(fetchOrder(dataFormat));
};

const fetchingCategory = () => async (dispatch) => {
  const url_category = `${process.env.REACT_APP_API_URL}/categories`;
  const response = await new APIClient().get(url_category);
  dispatch(fetchCategory(response));
};

export {
  fetchingCategoryAndAttribute,
  fetchingProducts,
  fetchingCart,
  fetchingData,
  fetchingDataGHN,
  fetchingOrder,
  fetchingCategory,
};
