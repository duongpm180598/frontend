export const formatMoney = (price) => {
  const formatedPrice = price ? price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }).slice(0, -3) : 0;
  return formatedPrice;
};

export const getTotalPrice = (cart) => {
  return cart.reduce((res, curr) => {
    const eachPrice = curr.unit_price * curr.quantity;
    res += eachPrice;
    return res;
  }, 0);
};

export const getTotalQuantity = (cart) => {
  return cart.reduce((res, curr) => (res += curr.quantity), 0);
};

export const getTotalWeight = (cart) => {
  return cart.reduce((res, curr) => (res += curr.weight), 0);
  // return 100;
};

export const getDistrictById = (districts, id) => {
  const districtCurr = districts.find((x) => x.district_id == id);
  return districtCurr.district_name;
};

export const getProvinceById = (province, id) => {
  const provinceCurr = province.find((x) => x.province_id == id);
  return provinceCurr.province_name;
};

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const formatDate = (stringIso) => {
  return new Date(stringIso).toLocaleDateString('sv-SE');
};

export const filterParams = (params) => {
  let newParams = {};
  Object.keys(params).forEach((x) => {
    if (params[x]) {
      newParams = { ...newParams, [x]: params[x] };
    }
  });
  return newParams;
};
