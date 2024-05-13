import moment from 'moment';
import { useEffect, useState } from 'react';
import { filterParams } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getTotalProducts } from '../../redux/selector';
import { fetchingData } from '../../redux/middleware';
import RemoveComponent from './Remove';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Pagination from '../Common/Pagination';

function ListProducts() {
  const products = useSelector(getProducts);
  const totalProducts = useSelector(getTotalProducts);
  const [productSelected, setProductSelected] = useState('');
  const dispatch = useDispatch();
  const ordersPerPage = 20;
  const [params, setParams] = useState({
    name: '',
    category_id: '',
    sort_by: '',
    order: '',
    limit: ordersPerPage,
    offset: 0,
  });
  const notify = (message, type) => toast(message, { type });
  const [check, setCheck] = useState({ update: false, delete: false });
  //  open modal
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = totalProducts ? Math.ceil(totalProducts / ordersPerPage) : 0;

  const getProductNameById = (id) => {
    const element = products.find((x) => x.id == id);
    return element.name;
  };

  useEffect(() => {
    const newParams = filterParams(params);
    dispatch(fetchingData(newParams));
  }, [count, params]);

  return (
    <div className="relative overflow-x-auto">
      <div className="my-5">
        <input
          type="text"
          id="default-search"
          name="name"
          value={params.name}
          onChange={(e) => {
            const value = e.target.value;
            setParams({ ...params, name: value });
          }}
          className="shadow-md block w-full px-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus-visible:border-gray-400 focus-visible:ring-white "
          placeholder="Tìm Sản Phẩm"
        />
      </div>
      <div className="flex justify-end">
        <Link
          to={`/manager/create-product`}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Tạo mới
        </Link>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="text-center py-3">#</th>
            <th className="py-3"></th>
            <th className="py-3">Tên sản phẩm</th>
            <th className="py-3">Ngày tạo</th>
            <th className="py-3">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            <>
              {products.map((product, index) => {
                const { id, name, thumbnail, created_at } = product;
                return (
                  <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="text-center">{(currentPage - 1) * ordersPerPage + index + 1}</td>
                    <td>
                      <img style={{ maxWidth: 200 }} className="w-full" src={thumbnail} alt="" />
                    </td>
                    <td>{name}</td>
                    <td>{moment(created_at).format('DD/MM/YYYY HH:mm')}</td>
                    <td>
                      <div className="flex items-center">
                        <Link
                          to={`/manager/update/${id}`}
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          Sửa
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setProductSelected(id);
                            setCheck({ ...check, delete: true });
                            setOpen(true);
                          }}
                          className="ml-3 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </>
          ) : (
            <tr></tr>
          )}
        </tbody>
      </table>
      <Pagination
        link=""
        setParams={setParams}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
        ordersPerPage={ordersPerPage}
      ></Pagination>
      {check.delete && (
        <RemoveComponent
          open={open}
          setOpen={setOpen}
          notify={notify}
          id={productSelected}
          setCount={setCount}
          path="list"
          name={getProductNameById(productSelected)}
        />
      )}
    </div>
  );
}

export default ListProducts;
