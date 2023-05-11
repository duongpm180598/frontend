import { useEffect, useState } from 'react';
import { classNames, filterParams, formatDate, formatMoney } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { fetchingOrder } from '../../redux/middleware';
import { getOrder, getStatus, getTotalOrder } from '../../redux/selector';
import Loading from '../../Components/Common/Loading';
import FilterOrder from '../../Components/Common/FilterOrder';
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from '../../Components/Common/Pagination';
import { userRole } from '../../Services/auth.service';

function Order() {
  // Initial data
  const statusOrder = {
    PENDING: 'Chờ Xác Nhận',
    READY_TO_PICK: 'Chuẩn Bị Giao Hàng',
    SHIPPING: 'Đang Giao Hàng',
    DONE: 'Giao Hàng Thành Công',
    CANCEL: 'Đã Hủy Đơn',
  };

  const role = userRole();
  let link = '/order';
  if (role === 'SELLER' || role === 'ADMIN') {
    link = '/manager/order';
  }
  const listOrder = useSelector(getOrder);
  const totalOrder = useSelector(getTotalOrder);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;
  const totalPages = totalOrder ? Math.ceil(totalOrder / ordersPerPage) : 0;

  // state

  const [params, setParams] = useState({
    status: '',
    sort_by: '',
    order: '',
    limit: ordersPerPage,
    offset: 0,
  });

  // selector
  const statusGlobal = useSelector(getStatus);
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  useEffect(() => {
    const newParams = filterParams(params);
    dispatch(fetchingOrder(newParams));
  }, [params]);

  return (
    <div className="bg-gray-50 min-h-[100vh]">
      <FilterOrder params={params} setParams={setParams} />
      <main className="mx-auto max-w-2xl pb-24 sm:px-6 sm:pt-16 lg:max-w-7xl lg:px-8 lg:pt-2">
        <section aria-labelledby="products-heading" className="mt-6">
          <h2 id="products-heading" className="sr-only">
            Products purchased
          </h2>
          {statusGlobal == 'pending' ? (
            <Loading />
          ) : (
            <div className="space-y-8">
              {listOrder.length ? (
                listOrder.map((order) => (
                  <div
                    onClick={() => {
                      naviagte(`/detail-order/${order.code}`, { state: { order: order } });
                    }}
                    key={order.code}
                    className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border cursor-pointer hover:opacity-90"
                  >
                    <div className="px-4 py-6 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                      <div className="sm:flex lg:col-span-7">
                        <div className="aspect-h-1 aspect-w-1 w-full flex-shrink-0 overflow-hidden rounded-lg sm:aspect-none sm:h-40 sm:w-40">
                          <img
                            src={order.thumbnail}
                            alt="#Picture_Error"
                            className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                          />
                        </div>

                        <div className="mt-6 sm:ml-6 sm:mt-0">
                          <h3 className="text-base font-medium text-gray-900">
                            <span>#{order.code}</span>
                          </h3>
                          <p className="mt-2 text-sm font-medium text-gray-900">{formatMoney(order.payment.amount)}</p>
                          <p className="mt-3 text-sm text-gray-500">Ngày Tạo: {formatDate(order.created_at)}</p>
                          <p className="mt-3 text-sm text-gray-500">Trạng Thái: {statusOrder[order.status]}</p>
                        </div>
                      </div>

                      <div className="mt-6 lg:col-span-5 lg:mt-0">
                        <dl className="grid grid-cols-2 gap-x-6 text-sm">
                          <div>
                            <dt className="font-medium text-gray-900">Địa Chỉ Giao Hàng</dt>
                            <dd className="mt-3 text-gray-500">
                              <span className="block">Số Nhà: {order.tracking.line}</span>
                              <span className="block">{order.tracking.ward}</span>
                              <span className="block">{order.tracking.district}</span>
                              <span className="block">Tỉnh {order.tracking.province}</span>
                            </dd>
                          </div>

                          <div>
                            <dt className="font-medium text-gray-900">Thông Tin Người Nhận</dt>
                            <dd className="mt-3 space-y-3 text-gray-500 overflow-x-scroll">
                              <p> {order.tracking.customer_name}</p>
                              <p> {order.tracking.customer_email}</p>
                              <p> {order.tracking.customer_phone}</p>
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="mx-auto text-left  mt-4 max-w-3xl text-base text-gray-500">Không Tìm Thấy Kết Quả</p>
              )}
            </div>
          )}
          {listOrder.length ? (
            <Pagination
              link={link}
              setParams={setParams}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              totalPages={totalPages}
              ordersPerPage={ordersPerPage}
            ></Pagination>
          ) : null}
        </section>
      </main>
    </div>
  );
}

export default Order;
