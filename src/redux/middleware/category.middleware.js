import { APIClient } from '../../helper/api_helper';
import { fetchCategory } from '../category.slice';

const fetchingCategory =
  (params = {}) =>
  async (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}/categories`;
    const response = await new APIClient().getWithToken(url, params);
    dispatch(fetchCategory(response));
  };

export { fetchingCategory };
