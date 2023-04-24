import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory, getProducts, getStatus } from '../../redux/selector';
import { fetchingData } from '../../redux/middleware';
import ProductComponent from '../../Components/Common/ProductComponent';
import Loading from '../../Components/Common/Loading';
import FilterHome from '../../Components/Common/FilterHome';
import { filterParams } from '../../utils';

function Home() {
  const dispatch = useDispatch();
  const [params, setParams] = useState({ name: '', category_id: '', sort_by: '', order: '' });
  // selector
  const products = useSelector(getProducts);
  const category = useSelector(getCategory);
  const statusGlobal = useSelector(getStatus);
  // console.log('statusGlobal ::', statusGlobal);
  useEffect(() => {
    const newParams = filterParams(params);
    dispatch(fetchingData(newParams));
  }, [params]);
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
        <FilterHome params={params} setParams={setParams} />

        {/* -------------- products -----------------*/}

        {statusGlobal == 'pending' ? (
          <Loading />
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products && products.length ? (
              products.map((x) => (
                <ProductComponent
                  key={x.id}
                  slug={x.slug}
                  id={x.id}
                  base_cost={x.base_cost}
                  name={x.name}
                  thumbnail={x.thumbnail}
                />
              ))
            ) : (
              <div className="min-h-[30vh] p-10">
                <p className="mx-auto mt-4 max-w-3xl text-base text-gray-500">Không Tìm Thấy Sản Phẩm </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
