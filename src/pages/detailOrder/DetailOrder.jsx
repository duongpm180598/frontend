import { useLocation } from 'react-router-dom';
import pending from '../../asset/image/clipboard.png';
import ready_to_pick from '../../asset/image/delivery-man.png';
import shipping from '../../asset/image/fast-delivery.png';
import done from '../../asset/image/check.png';
import cancel from '../../asset/image/remove.png';
import { classNames, formatDate, formatMoney, getTotalPrice } from '../../utils';
import { useEffect, useState } from 'react';
import { APIClient } from '../../helper/api_helper';
import Loading from '../../Components/Common/Loading';
import { userRole } from '../../Services/auth.service';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Initial Data :
const statusOrder = [
  {
    name: 'PENDING',
    value: 'Chờ Xác Nhận',
    desc: 'khoảng 1 ngày',

    img: pending,
  },
  {
    name: 'READY_TO_PICK',
    value: 'Shipper Đang Lấy Hàng',
    desc: 'khoảng 2-3 ngày',
    img: ready_to_pick,
  },
  {
    name: 'SHIPPING',
    value: 'Đang Giao Hàng',
    desc: 'khoảng 7-9 ngày',
    img: shipping,
  },
  {
    name: 'DONE',
    value: 'Giao Hàng Thành Công',
    desc: '',
    img: done,
  },

  {
    name: 'CANCEL',
    value: 'Đã Hủy Đơn',
    desc: '',
    img: cancel,
  },
];

function DetailOrder() {
  const checkAdmin = userRole();
  const notify = (message) => toast(`${message}`, { type: 'success' });
  // console.log('check admin ::', checkAdmin);
  const [currOrder, setCurrOrder] = useState();

  let {
    state: { order },
  } = useLocation();
  useEffect(() => {
    new APIClient().getWithToken(`${process.env.REACT_APP_API_URL}/orders/code/${order.code}`).then((res) => {
      setCurrOrder(res);
    });
  }, []);
  const handleOrder = () => {
    new APIClient()
      .updateWithToken(`${process.env.REACT_APP_API_URL}/orders/${currOrder.id}/confirm`)
      .then((res) => {
        // alert('Đã Xác Nhận Đơn Hàng');
        notify('Xác Nhận Thành Công');
        setCurrOrder({ ...currOrder, status: 'READY_TO_PICK' });
      })
      .catch((e) => {
        console.log('error ::', e);
      });
  };

  const handleCancel = () => {
    new APIClient()
      .updateWithToken(`${process.env.REACT_APP_API_URL}/orders/${currOrder.id}/cancel`)
      .then((res) => {
        // alert('Đã Hủy Đơn Hàng');
        notify('Đã Hủy Đơn Hàng');
        setCurrOrder({ ...currOrder, status: 'CANCEL' });
      })
      .catch((e) => {
        console.log('err ::', e);
      });
  };

  if (!currOrder) return <Loading></Loading>;
  return (
    <div className="bg-gray-50">
      <main className="mx-auto max-w-2xl pb-24 sm:px-6 sm:pt-16 lg:max-w-7xl lg:px-8 lg:pt-2 mt-10">
        <div className="p-5 grid grid-cols-12 gap-x-5">
          <div className="lg:col-span-4 md:col-span-8 ssm:col-span-12">
            <ol className="relative text-gray-500 border-l border-gray-200">
              {statusOrder.map((x, index) => (
                <li key={index} className="mb-10 ml-6">
                  <span
                    className={classNames(
                      'absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-white dark:ring-gray-500',
                      x.name == currOrder.status ? 'dark:bg-green-700' : ''
                    )}
                  >
                    <img className="w-6 h-6" src={x.img} alt="" />
                  </span>
                  <h3 className="font-medium leading-tight">{x.value}</h3>
                  <p className="text-sm">{x.desc}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-8 ssm:col-span-12 ssm:ml-[-20px] lg:mt-[-10px]">
            <div className="">
              <h2 className="text-lg font-medium text-gray-900">Thông Tin Đơn Hàng</h2>

              <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                <h3 className="sr-only">Sản Phẩm Trong Giỏ Hàng</h3>
                <ul role="list" className="divide-y divide-gray-200">
                  {currOrder.order_items?.map((x, index) => (
                    <li key={index} className="flex px-4 py-6 sm:px-6">
                      <div className="flex-shrink-0">
                        <img src={x.thumbnail} alt="#Error_Picture" className="w-20 rounded-md" />
                      </div>

                      <div className="ml-6 flex flex-1 flex-col">
                        <div className="flex">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm">
                              <span className="font-medium text-gray-700 hover:text-gray-800">{x.name}</span>
                            </h4>
                            <p className="mt-1 text-sm text-gray-500">{x.attributes[0].value}</p>
                            <p className="mt-1 text-sm text-gray-500">{x.attributes[1].value}</p>
                          </div>
                        </div>

                        <div className="flex flex-1 items-end justify-between pt-2">
                          <p className="mt-1 text-sm font-medium text-gray-900">{formatMoney(x.unit_price)}</p>

                          <div className="ml-4">
                            <label htmlFor="quantity" className="sr-only">
                              Quantity
                            </label>
                            <span className="mr-1">x {x.quantity}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Tiền Sản Phẩm</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {currOrder.order_items ? formatMoney(getTotalPrice(currOrder.order_items)) : 0}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Shipping</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {currOrder.tracking ? formatMoney(currOrder.tracking.fee) : 0}
                    </dd>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <dt className="text-base font-medium">Tổng</dt>
                    <dd className="text-base font-medium text-gray-900">
                      {currOrder.tracking && currOrder.order_items
                        ? formatMoney(getTotalPrice(currOrder.order_items) + currOrder.tracking.fee)
                        : 0}
                    </dd>
                  </div>
                </dl>
                {checkAdmin == 'ADMIN' || checkAdmin == 'SELLER' ? (
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6 grid grid-cols-12 gap-x-5">
                    <button
                      disabled={currOrder.status !== 'PENDING'}
                      onClick={handleOrder}
                      className={classNames(
                        currOrder.status !== 'PENDING' ? 'cursor-default opacity-50' : '',
                        ' col-span-6 rounded-md border border-transparent bg-green-500 px-4 py-3 text-base font-medium text-white shadow-sm  focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2 focus:ring-offset-gray-50'
                      )}
                    >
                      Xác Nhận
                    </button>

                    <button
                      disabled={currOrder.status !== 'PENDING'}
                      onClick={handleCancel}
                      className={classNames(
                        currOrder.status !== 'PENDING' ? 'cursor-default opacity-50' : '',
                        'col-span-6 rounded-md border border-transparent bg-red-500 px-4 py-3 text-base font-medium text-white shadow-sm  focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 focus:ring-offset-gray-50'
                      )}
                    >
                      Hủy Đơn
                    </button>
                  </div>
                ) : null}
                {checkAdmin == 'BUYER' ? (
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6 grid grid-cols-12 gap-x-5">
                    <button
                      disabled={currOrder.status !== 'PENDING'}
                      onClick={handleCancel}
                      className={classNames(
                        currOrder.status !== 'PENDING' ? 'cursor-default opacity-50' : '',
                        'col-span-6 rounded-md border border-transparent bg-red-500 px-4 py-3 text-base font-medium text-white shadow-sm  focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 focus:ring-offset-gray-50'
                      )}
                    >
                      Hủy Đơn
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </main>
    </div>
  );
}

export default DetailOrder;
