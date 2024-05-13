import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory, getProducts, getStatus, getTotalProducts } from '../../redux/selector';
import { fetchingData } from '../../redux/middleware';
import ProductComponent from '../../Components/Common/ProductComponent';
import Loading from '../../Components/Common/Loading';
import FilterHome from '../../Components/Common/FilterHome';
import { filterParams } from '../../utils';
import { APIClient } from '../../helper/api_helper';
import MostViewProducts from '../../Components/Common/MostView/MostViewProducts';
import Pagination from '../../Components/Common/Pagination';

function Home() {
  // selector
  const products = useSelector(getProducts);
  const category = useSelector(getCategory);
  const statusGlobal = useSelector(getStatus);
  const totalProducts = useSelector(getTotalProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const ordersPerPage = 20;
  const totalPages = totalProducts ? Math.ceil(totalProducts / ordersPerPage) : 0;
  const [params, setParams] = useState({
    name: '',
    category_id: '',
    sort_by: '',
    order: '',
    limit: ordersPerPage,
    offset: 0,
  });
  const [hotView, setHostView] = useState('false');
  useEffect(() => {
    const newParams = filterParams(params);
    dispatch(fetchingData(newParams));
  }, [params]);

  useEffect(() => {
    if (!hotView) return;
    new APIClient().get();
  }, [hotView]);

  useEffect(() => {});
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl p-4 sm:p-6 lg:max-w-7xl lg:px-8">
        <MostViewProducts />

        {/* -------------- filter -----------------*/}

        <FilterHome params={params} setParams={setParams} />
        {/* -------------- products -----------------*/}

        {statusGlobal == 'pending' ? (
          <Loading />
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 smd:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
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
        {products?.length ? (
          <Pagination
            link=""
            setParams={setParams}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalPages={totalPages}
            ordersPerPage={ordersPerPage}
          ></Pagination>
        ) : null}
      </div>
    </div>
  );
}

export default Home;
