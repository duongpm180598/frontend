import { useEffect, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/20/solid';
import { classNames, formatMoney, getDistrictById, getProvinceById, getTotalPrice, getTotalWeight } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { fetchingDataGHN } from '../../redux/middleware';
import { getCart, getDistricts, getProvinces, getWards } from '../../redux/selector';
import { APIClient } from '../../helper/api_helper';
import { fetchDistricts, fetchWards } from '../../redux/GHN.slice';

const paymentMethods = [
  { id: 'CASH', title: 'Thanh Toán Khi Nhận Hàng' },
  { id: 'VNPAY', title: 'VNPAY' },
];

export default function Checkout() {
  const dispatch = useDispatch();
  const [shipping, setShipping] = useState(0);
  const [address, setAddress] = useState({
    provinceId: '',
    province: '',
    districtId: '',
    district: '',
    ward: '',
  });

  useEffect(() => {
    dispatch(fetchingDataGHN());
  }, []);

  useEffect(() => {
    if (address.provinceId) {
      new APIClient()
        .getWithToken(`${process.env.REACT_APP_API_URL}/ghn/districts?province_id=${address.provinceId}`)
        .then((res) => {
          dispatch(fetchDistricts(res));
        })
        .catch((e) => console.log('e:: ', e));
    }
    if (address.districtId) {
      new APIClient()
        .getWithToken(`${process.env.REACT_APP_API_URL}/ghn/wards?district_id=${address.districtId}`)
        .then((res) => {
          dispatch(fetchWards(res));
        })
        .catch((e) => console.log('e ::', e));
    }
    if (address.provinceId && address.districtId && address.ward) {
      new APIClient()
        .createWithToken(`${process.env.REACT_APP_API_URL}/ghn/shipping-fee`, {
          to_district: address.district,
          to_ward: address.ward,
          weight: getTotalWeight(cart),
        })
        .then((res) => setShipping(res.total))
        .catch((e) => console.log('e ::', e));
    }
    return;
  }, [address.provinceId, address.district, address.ward]);

  const provinces = useSelector(getProvinces);
  const districts = useSelector(getDistricts);
  const wards = useSelector(getWards);
  const cart = useSelector(getCart);

  console.log(address);

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Checkout</h2>

        <form onSubmit={(e) => e.preventDefault()} className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <div>
            <div className="border-gray-200 ">
              <h2 className="text-lg font-medium text-gray-900">Thông Tin Giao Hàng</h2>

              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                {/* Họ Tên */}
                <div className="sm:col-span-2">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    Họ Tên
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="first-name"
                      name="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                {/* Số Điện Thoại */}
                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Số Điện Thoại
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      autoComplete="tel"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                {/* Tỉnh Thành Phố */}
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Tỉnh / Thành Phố
                  </label>
                  <div className="mt-1">
                    <select
                      id="country"
                      name="provinceId"
                      autoComplete="country-name"
                      value={address.provinceId}
                      onChange={(e) => {
                        const provinceNameCurr = getProvinceById(provinces, e.target.value);
                        setAddress({
                          [e.target.name]: e.target.value,
                          districtId: '',
                          ward: '',
                          district: '',
                          province: provinceNameCurr,
                        });
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option className="hidden" value={''}>
                        Chọn Thành Phố
                      </option>
                      {provinces?.map((x, index) => (
                        <option key={index} value={x.province_id}>
                          {x.province_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Quận Huyện */}
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Quận / Huyện
                  </label>
                  <div className="mt-1">
                    <select
                      id="country"
                      name="districtId"
                      value={address.districtId}
                      onChange={(e) => {
                        const districtNameCurr = getDistrictById(districts, e.target.value);
                        setAddress({
                          ...address,
                          [e.target.name]: e.target.value,
                          district: districtNameCurr,
                          ward: '',
                        });
                      }}
                      autoComplete="country-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value={''} className="hidden">
                        Chọn Quận Huyện
                      </option>

                      {districts?.map((x, index) => (
                        <option key={index} value={x.district_id}>
                          {x.district_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Phường Xã */}
                <div>
                  <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                    Phường / Xã
                  </label>
                  <div className="mt-1">
                    <select
                      id="country"
                      name="ward"
                      autoComplete="country-name"
                      value={address.ward}
                      onChange={(e) => {
                        setAddress({ ...address, [e.target.name]: e.target.value });
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value={''} className="hidden">
                        Chọn Phường / Xã
                      </option>

                      {wards?.map((x, index) => (
                        <option key={index} value={x.ward_name}>
                          {x.ward_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Giao Hangf */}
            <div className="mt-10 border-t border-gray-200 pt-10">
              <RadioGroup>
                <RadioGroup.Label className="text-lg font-medium text-gray-900">Phương Thức Giào Hàng</RadioGroup.Label>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <RadioGroup.Option className="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none border-transparent ring-2 ring-indigo-500">
                    <>
                      <span className="flex flex-1">
                        <span className="flex flex-col">
                          <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                            Giao Hàng Nhanh
                          </RadioGroup.Label>
                          <RadioGroup.Description as="span" className="mt-1 flex items-center text-sm text-gray-500">
                            4 - 10 ngày
                          </RadioGroup.Description>
                          {/* <RadioGroup.Description as="span" className="mt-6 text-sm font-medium text-gray-900">
                                {deliveryMethod.price}
                              </RadioGroup.Description> */}
                        </span>
                      </span>
                      <CheckCircleIcon className="h-5 w-5 text-indigo-600" aria-hidden="true" />
                      <span
                        className={classNames(
                          'border',
                          'border-indigo-500',
                          'pointer-events-none absolute -inset-px rounded-lg'
                        )}
                        aria-hidden="true"
                      />
                    </>
                  </RadioGroup.Option>
                </div>
              </RadioGroup>
            </div>

            {/* Payment */}
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">Phương Thức Thanh Toán</h2>

              <fieldset className="mt-4">
                <legend className="sr-only">Loại Thanh Toán</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                  {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                    <div key={paymentMethod.id} className="flex items-center">
                      {paymentMethodIdx === 0 ? (
                        <input
                          id={paymentMethod.id}
                          name="payment-type"
                          type="radio"
                          defaultChecked
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      ) : (
                        <input
                          id={paymentMethod.id}
                          name="payment-type"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      )}

                      <label htmlFor={paymentMethod.id} className="ml-3 block text-sm font-medium text-gray-700">
                        {paymentMethod.title}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Thông Tin Đơn Hàng</h2>

            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Sản Phẩm Trong Giỏ Hàng</h3>
              <ul role="list" className="divide-y divide-gray-200">
                {cart.map((x, index) => (
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
                          <p className="mt-1 text-sm text-gray-500">{x.color}</p>
                          <p className="mt-1 text-sm text-gray-500">{x.size}</p>
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
                  <dd className="text-sm font-medium text-gray-900">{formatMoney(getTotalPrice(cart))}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">{formatMoney(shipping)}</dd>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Tổng</dt>
                  <dd className="text-base font-medium text-gray-900">{formatMoney(getTotalPrice(cart) + shipping)}</dd>
                </div>
              </dl>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Đặt Hàng
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
