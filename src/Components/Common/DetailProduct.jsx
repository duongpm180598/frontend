import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { APIClient } from '../../helper/api_helper';
import { RadioGroup } from '@headlessui/react';
import { CurrencyDollarIcon, GlobeAmericasIcon } from '@heroicons/react/24/outline';
import { formatMoney } from '../../utils';
import { useDispatch } from 'react-redux';
import { addToCart, removeQuantityWhenError } from '../../redux/cart.slice';
import Loading from './Loading';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const DetailProduct = () => {
  const {
    state: { slug },
  } = useLocation();

  const notify = (message, type) => toast(message, { type });

  // state
  const [product, setProduct] = useState();
  const [variant, setVariant] = useState({ size: '', color: '', number: '', price: '' });
  const [sizes, setSizes] = useState([]);
  const [check, setCheck] = useState(false);
  const [listVariants, setListVariants] = useState([]);

  // initial data;
  const description =
    '<p>Sản phẩm luôn được cập nhật mới nhất từ các nhà cung cấp</p> <p>Thiết kế là một sự kết hợp tuyệt vời giữa phong cách truyền thống và hiện đại, với sự mỏng nhẹ và bo tròn viền ở giúp tạo nên phong cách cá tính và trẻ trung</p>';
  const colorHash = {
    Xám: 'bg-[#A9A9A9]',
    Trắng: 'bg-[#FFFFFF]',
    Lục: 'bg-[#228B22]',
    Xanh: 'bg-[#0000FF]',
    Cam: 'bg-[#FF8C00]',
    Đen: 'bg-[#000000]',
    Vàng: 'bg-[#FFD700]',
    Be: 'bg-[#F5F5DC]',
    Bạc: 'bg-[#C0C0C0]',
    Tím: 'bg-[#eb34c9]',
    Đỏ: 'bg-[#de0b2e]',
    Hồng: 'bg-[#FF1493]',
  };

  const dispatch = useDispatch();

  const policies = [
    { name: 'Giao Hàng Quốc Tế', icon: GlobeAmericasIcon, description: 'Đơn Đặt Hàng Trong Năm' },
    { name: 'Ưu Đãi Với Khách Quen', icon: CurrencyDollarIcon, description: 'Nhiều Mã Giảm Giá' },
  ];
  const details = [
    'Sản Phẩm Chính Hãng',
    'Giá Bán Cạnh Tranh',
    'Luôn được kiểm tra trước khi giao',
    'Đổi Trả Và Bảo Hành',
  ];

  const getColor = (size) => {
    const colorStore = [];
    console.log({ size });
    product.product_variants.forEach((x) => {
        const [color, size1] = x.variant_attributes;
        if (size1.value == size) {
          colorStore.push(color.value);
        }
    });
    return colorStore;
  };

  const getVariant = (size, color) => {
    let id_variant = '',
      price = '';
    product.product_variants.forEach((x) => {
      const [color1, size1] = x.variant_attributes;
      if (size1.value == size && color1.value === color) {
        id_variant = x.id;
        price = x.price;
      }
    });
    if (price) price = formatMoney(price);

    return [id_variant, price];
  };

  const handleAddToCart = () => {
    const id_variant = getVariant(variant.size, variant.color)[0];
    const data = { variant_id: id_variant, quantity: 1 };
    dispatch(addToCart());
    new APIClient()
      .createWithToken(`${process.env.REACT_APP_API_URL}/cart-items`, data)
      .then((res) => {
        notify('Thêm sản phẩm thành công', 'success');
      })
      .catch((e) => {
        notify('thêm sản phẩm thất bại', 'error');
        dispatch(removeQuantityWhenError());
      });
  };

  useEffect(() => {
    const stringQuery = `${process.env.REACT_APP_API_URL}/products/p/${slug}`;
    new APIClient()
      .getWithToken(stringQuery)
      .then((res) => {
        const sizeStore = [];
        res.product_variants.forEach((x) => {
          x.variant_attributes.forEach((y) => {
            if (y.name === 'Size' && !sizeStore.includes(y.value)) sizeStore.push(y.value);
          });
        });
        setListVariants(res.product_variants);
        setSizes(sizeStore);
        setProduct(res);
      })
      .catch((e) => console.log('e ::', e));
  }, []);

  if (!product) return <Loading></Loading>;
  return (
    <>
      <div className="bg-white">
        <div className="pb-16 pt-6 sm:pb-24">
          <div className="mx-auto mt-4 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
              <div className="lg:col-span-5 lg:col-start-8">
                <div className="flex justify-between">
                  <h1 className="text-xl font-medium text-gray-900">{product.name}</h1>
                  <p className="text-xl font-medium text-gray-900">{product.price}</p>
                </div>
              </div>

              {/* Image gallery */}
              <div className="mt-4 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                <h2 className="sr-only">Images</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                  {product.product_images.map((x, index) => (
                    <img
                      key={x.external_id}
                      src={x.url}
                      alt={x.external_name}
                      className={classNames(
                        index == 0 ? 'lg:col-span-2 lg:row-span-2 w-full h-full' : 'hidden lg:block',
                        'rounded-lg'
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4 lg:col-span-5">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddToCart();
                  }}
                  className=""
                >
                  {/* Size picker */}
                  <div className="mt-4 mb-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm font-medium text-gray-900">Kích cỡ</h2>
                    </div>

                    <RadioGroup className="mt-2">
                      <RadioGroup.Label className="sr-only"> Choose a size </RadioGroup.Label>
                      <div className="grid grid-cols-3 gap-3">
                        {sizes.map((size, index) => (
                          <RadioGroup.Option
                            key={index}
                            value={size}
                            onClick={() => {
                              setCheck(false);
                              setVariant({ ...variant, size, color: '' });
                            }}
                            className={({ active, checked }) =>
                              classNames(
                                'cursor-pointer focus:outline-none',
                                active ? 'ring-2 ring-indigo-500 ring-offset-2' : '',
                                checked
                                  ? 'border-transparent bg-indigo-600 text-white hover:bg-indigo-700'
                                  : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50',
                                'items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase col-span-1 text-black'
                              )
                            }
                            disabled={false}
                          >
                            <RadioGroup.Label as="span">{size}</RadioGroup.Label>
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Color picker */}
                  {variant.size ? (
                    <div>
                      <h2 className="text-sm font-medium text-gray-900">Màu</h2>

                      <RadioGroup className="mt-2">
                        <RadioGroup.Label className="sr-only"> Choose a color </RadioGroup.Label>
                        <div className="flex items-center space-x-3">
                          {getColor(variant.size).map((x, index) => (
                            <RadioGroup.Option
                              key={index}
                              value={x}
                              onClick={() => {
                                setCheck(false);
                                setVariant({ ...variant, color: x });
                              }}
                              className={({ active, checked }) =>
                                classNames(
                                  'ring-gray-900',
                                  active && checked ? 'ring ring-offset-1' : '',
                                  !active && checked ? 'ring-1' : '',
                                  // check ? 'first:ring first:ring-offset-1' : '',
                                  'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none '
                                )
                              }
                            >
                              <RadioGroup.Label as="span" className="sr-only"></RadioGroup.Label>
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  colorHash[x],
                                  'h-8 w-8 rounded-full border border-black border-opacity-10'
                                )}
                              />
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  ) : null}

                  {/* Price Variant */}
                  {variant.size && variant.color ? (
                    <div className="mt-5">
                      <span className="text-sm font-medium text-gray-900">Giá :</span>
                      <span className="text-sm font-medium text-[#333] ml-5 opacity-70">
                        {getVariant(variant.size, variant.color)[1]} VND
                      </span>
                    </div>
                  ) : (
                    <div className="h-[44px]"></div>
                  )}

                  <button
                    type="submit"
                    className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Thêm Vào Giỏ Hàng
                  </button>
                </form>

                {/* Product details */}
                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Mô tả</h2>
                  <div
                    className="prose prose-sm mt-4 text-gray-500"
                    dangerouslySetInnerHTML={{ __html: product.description || description }}
                  />
                </div>

                <div className="mt-4 border-t border-gray-200 pt-8">
                  <h2 className="text-sm font-medium text-gray-900">Cam Kết &amp; Đảm Bảo</h2>

                  <div className="prose prose-sm mt-4 text-gray-500">
                    <ul role="list">
                      {details.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Policies */}
                <section aria-labelledby="policies-heading" className="mt-10">
                  <h2 id="policies-heading" className="sr-only">
                    Our Policies
                  </h2>

                  <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {policies.map((policy) => (
                      <div key={policy.name} className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                        <dt>
                          <policy.icon className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                          <span className="mt-4 text-sm font-medium text-gray-900">{policy.name}</span>
                        </dt>
                        <dd className="mt-1 text-sm text-gray-500">{policy.description}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              </div>
            </div>
            {/* <button onClick={notify}>Notify!</button> */}
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
