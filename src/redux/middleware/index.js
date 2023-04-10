import { APIClient } from '../../helper/api_helper';
import { fetchCategory } from '../category.slice';
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

export { fetchingCategoryAndAttribute };
