export const formatMoney = (price) => {
  return price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
};

export const getTotalPrice = (cart) => {
  return cart.reduce((res, curr) => {
    const eachPrice = curr.unit_price * curr.quantity;
    res += eachPrice;
    return res;
  }, 0);
};
