import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/selector';
import { fetchingProducts } from '../../redux/middleware';
import ProductComponent from '../../Components/Common/ProductComponent';
function Home() {
  const dispatch = useDispatch();
  const products = useSelector(getProducts);

  // console.log('products ::', products);
  useEffect(() => {
    dispatch(fetchingProducts());
  }, []);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products?.map((x) => (
            <ProductComponent key={x.id} id={x.id} base_cost={x.base_cost} name={x.name} thumbnail={x.thumbnail} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
