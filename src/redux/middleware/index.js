import { APIClient } from '../../helper/api_helper';
import { fetchProvinces } from '../GHN.slice';
import { fetchCart, fetchQuantity } from '../cart.slice';
import { fetchCategory } from '../category.slice';
import { fetchOrder } from '../order.slice';
import { fetchProducts } from '../products.slice';
import { statusPending, statusResolve } from '../status.slice';
import { fetchVariantAttribute } from '../variantAttribute.slice';
import { fetchSuppliers } from '../suppliers.slice';
import { fetchProductVariant } from '../productVariant.slice';
import { fetchStatisticData } from '../statistic.slice';

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
    const formatResponse = response.items.map((x) => {
      const [size, color] = x.attributes;
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
    dispatch(fetchCart({ products: formatResponse, total: response.total }));
  };

const fetchingData = (params) => async (dispatch) => {
  const url_cart = `${process.env.REACT_APP_API_URL}/cart-items`;
  const url_products = `${process.env.REACT_APP_API_URL}/products`;
  const promiseProduct = new APIClient().getWithToken(url_products, params);
  const promiseCart = new APIClient().getWithToken(url_cart);
  dispatch(statusPending());
  const response = await Promise.all([promiseProduct, promiseCart]);
  dispatch(statusResolve());
  dispatch(fetchProducts(response[0].products));
  dispatch(fetchQuantity(response[1].total));
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

const fetchingSupplier = () => async (dispatch) => {
  const url_suppliers = `${process.env.REACT_APP_API_URL}/suppliers`;
  const response = await new APIClient().getWithToken(url_suppliers);
  dispatch(fetchSuppliers(response));
};

const fetchingProductVariant = (product_id) => async (dispatch) => {
  const url_variant = `${process.env.REACT_APP_API_URL}/products/${product_id}`;
  const response = await new APIClient().getWithToken(url_variant);
  dispatch(fetchProductVariant(response.product_variants));
};

const fetchingStatisticsInRange = (params) => async (dispatch) => {
  const url_variant = `${process.env.REACT_APP_API_URL}/product-statistics`;
  const response = await new APIClient().getWithToken(url_variant, params);
  dispatch(fetchStatisticData(response));
};

const fetchingStatisticsInMonth = (params) => async (dispatch) => {
  const url_variant = `${process.env.REACT_APP_API_URL}/product-statistics/in-month`;
  const response = await new APIClient().getWithToken(url_variant, params);
  dispatch(fetchStatisticData(response));
  const fakeData = [
    {
      id: '10151860-6741-4f75-aec7-abc61cb8ebc5',
      name: 'Áo Len Extra Fine Merino Cổ Tròn Dài Tay',
      total: 799000,
      sold: 1,
    },
    {
      id: '14146ef0-a783-4027-8c2e-0373d6847eb4',
      name: 'AirSense Áo Khoác (Siêu Nhẹ) (Glen Kẻ Caro)',
      total: 17988000,
      sold: 12,
    },
    {
      id: 'b67a7fba-5150-46e8-ae7a-2e4bb9147eef',
      name: 'AirSense Áo Blazer (Siêu Nhẹ)',
      total: 500000,
      sold: 2,
    },
    {
      id: 'bffde639-402e-4920-95d5-59cca7a7c5cb',
      name: 'Áo Khoác Giả Lông Cừu Loại Dày Kéo Khóa Dài Tay',
      total: 1398000,
      sold: '2',
    },
  ];
  dispatch(fetchStatisticData(fakeData));
};

const createBill = async (data) => {
  const url_variant = `${process.env.REACT_APP_API_URL}/bills`;
  const response = await new APIClient().createWithToken(url_variant, data);
  return response.id;
};

const exportBill = async (id, filename) => {
  const url_variant = `${process.env.REACT_APP_API_URL}/bills/${id}/export`;
  await new APIClient().exportFile(url_variant, filename);
};

export {
  fetchingCategoryAndAttribute,
  fetchingProducts,
  fetchingCart,
  fetchingData,
  fetchingDataGHN,
  fetchingOrder,
  fetchingCategory,
  fetchingSupplier,
  fetchingProductVariant,
  fetchingStatisticsInRange,
  fetchingStatisticsInMonth,
  createBill,
  exportBill,
};
