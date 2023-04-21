import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/selector';
import { fetchingData } from '../../redux/middleware';
import ProductComponent from '../../Components/Common/ProductComponent';
import Loading from '../../Components/Common/Loading';
import FilterHome from '../../Components/Common/FilterHome';
function Home() {
  const dispatch = useDispatch();
  const products = useSelector(getProducts);

  useEffect(() => {
    dispatch(fetchingData());
  }, []);
  if (!products) return <Loading />;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-14 lg:max-w-7xl lg:px-8">
        {/* -------------- session -----------------*/}
        <div className="relative bg-gray-900">
          <div aria-hidden="true" className="overflow-hidden mx-auto w-full h-[50vh] rounded-md">
            <img
              src={require('../../asset/image/session.jpeg')}
              alt=""
              className="h-full w-full object-cover object-center opacity-25 rounded"
            />
          </div>
        </div>

        {/* -------------- filter -----------------*/}
        <FilterHome />

        {/* -------------- products -----------------*/}

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
