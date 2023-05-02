import { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchingCart } from '../../redux/middleware';
import { getCart, getStatus } from '../../redux/selector';
import { getTotalPrice, formatMoney, classNames } from '../../utils';
import { downQuantity, removeProduct, upQuantity } from '../../redux/cart.slice';
import { APIClient } from '../../helper/api_helper';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Components/Common/Loading';
export default function Cart() {
  const navigate = useNavigate();
  const dispath = useDispatch();

  // selector
  const currCart = useSelector(getCart);
  const statusGlobal = useSelector(getStatus);

  // Handle Actions

  const handleUpQuantity = (product) => {
    dispath(upQuantity(product));
    new APIClient()
      .updateWithToken(`${process.env.REACT_APP_API_URL}/cart-items/${product.id}`, {
        quantity: product.quantity + 1,
      })
      .then((res) => console.log('res ::', res))
      .catch((e) => {
        alert(e);
        dispath(downQuantity(product));
      });
  };

  const handleDownQuantity = (product) => {
    dispath(downQuantity(product));
    new APIClient()
      .updateWithToken(`${process.env.REACT_APP_API_URL}/cart-items/${product.id}`, {
        quantity: product.quantity - 1,
      })
      .then((res) => console.log(res))
      .catch((e) => {
        dispath(upQuantity(product));
      });
  };

  const handleRemoveItem = (product) => {
    dispath(removeProduct(product));
    new APIClient().deleteWithToken(`${process.env.REACT_APP_API_URL}/cart-items/${product.id}`);
  };

  const handleCheckOut = () => {
    navigate('/checkout');
  };

  useEffect(() => {
    dispath(fetchingCart());
  }, []);

  if (!currCart) return <Loading />;
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Giỏ Hàng</h1>
        {statusGlobal == 'pending' ? (
          <Loading />
        ) : (
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16"
          >
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                {currCart.map((x, index) => (
                  <li key={index} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <img
                        src={x.thumbnail}
                        alt="#Error_picture"
                        className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid ssm:grid-cols-1 md:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <span className="font-medium text-gray-700 hover:text-gray-800">{x.name}</span>
                            </h3>
                          </div>
                          <div className="mt-1 flex text-sm">
                            <p className="text-gray-500">{x.color}</p>
                            {x.size ? (
                              <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{x.size}</p>
                            ) : null}
                          </div>
                          <p className="mt-5 text-sm font-medium text-gray-900">{formatMoney(x.unit_price)}</p>
                        </div>

                        <div className="sm:mt-4 ssm:mt-2 md:pr-9">
                          <div>
                            <button
                              onClick={() => handleUpQuantity(x)}
                              className="p-1.5 rounded-md border border-gray-300 cursor-pointer"
                            >
                              +
                            </button>
                            <span className="mx-3">{x.quantity}</span>
                            <button
                              disabled={x.quantity == 1}
                              onClick={() => handleDownQuantity(x)}
                              className={classNames(
                                x.quantity == 1
                                  ? 'p-1.5 rounded-md border border-gray-300 opacity-50 cursor-not-allowed'
                                  : 'p-1.5 rounded-md border border-gray-300 cursor-pointer'
                              )}
                            >
                              -
                            </button>
                          </div>
                          <div className="absolute right-0 top-0">
                            <button
                              onClick={() => handleRemoveItem(x)}
                              type="button"
                              className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                            >
                              <span className="sr-only">Remove</span>
                              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              {currCart.length ? null : <p className="mt-10 text-sm text-gray-500">Giỏ Hàng Trống</p>}
            </section>

            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
            >
              <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                Tiền Tạm Tính <span className="italic text-sm text-[#333]">(chưa bao gồm phí vận chuyển)</span>
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Tiền Sản Phẩm</dt>
                  <dd className="text-sm font-medium text-gray-900">{formatMoney(getTotalPrice(currCart))}</dd>
                </div>
              </dl>

              <div className="mt-6">
                <button
                  onClick={handleCheckOut}
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Checkout
                </button>
              </div>
            </section>
          </form>
        )}
      </div>
    </div>
  );
}
