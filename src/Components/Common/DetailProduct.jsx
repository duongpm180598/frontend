import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { APIClient } from '../../helper/api_helper';
import { StarIcon } from '@heroicons/react/20/solid';
import { RadioGroup } from '@headlessui/react';
import { CurrencyDollarIcon, GlobeAmericasIcon } from '@heroicons/react/24/outline';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const DetailProduct = () => {
  const {
    state: { id },
  } = useLocation();

  const [product, setProduct] = useState();
  const [variant, setVariant] = useState({ size: '', color: '', number: '', price: '' });
  const [sizes, setSizes] = useState([]);

  const policies = [
    { name: 'International delivery', icon: GlobeAmericasIcon, description: 'Get your order in 2 years' },
    { name: 'Loyalty rewards', icon: CurrencyDollarIcon, description: "Don't look at other tees" },
  ];
  const details = [
    'Only the best materials',
    'Ethically and locally made',
    'Pre-washed and pre-shrunk',
    'Machine wash cold with similar colors',
  ];

  // const [colors, setColors] = useState();
  const colors = [
    { name: 'Black', bgColor: 'bg-gray-900', selectedColor: 'ring-gray-900' },
    { name: 'Heather Grey', bgColor: 'bg-gray-400', selectedColor: 'ring-gray-400' },
  ];

  // const res = {
  //   id: '45ad91f4-06a8-4775-8e5a-1a45e28042c4',
  //   name: 'AirSense Áo Blazer (Siêu Nhẹ)',
  //   slug: 'airsense-ao-blazer-sieu-nhe',
  //   base_cost: 250000,
  //   thumbnail: 'https://res.cloudinary.com/xanhz/image/upload/v1680775975/group9-es/zvauznwpeft46rf7wxqq.png',
  //   description: 'Áo khoác siêu nhẹ, co giãn và nhanh khô của chúng tôi. Kiểu dáng áo trên xu hướng.',
  //   category_id: '56b249ba-b069-40c9-89ad-eba1b4f3efdf',
  //   created_at: '2023-04-06T10:13:00.868Z',
  //   updated_at: '2023-04-06T10:13:00.868Z',
  //   product_images: [],
  //   product_variants: [
  //     {
  //       id: 'a4765280-bb97-4a58-8fea-7bd86bbbb484',
  //       product_id: '45ad91f4-06a8-4775-8e5a-1a45e28042c4',
  //       weight: 20,
  //       inventory: 4,
  //       price: 250000,
  //       created_at: '2023-04-06T10:13:00.868Z',
  //       updated_at: '2023-04-06T10:13:00.868Z',
  //       variant_attributes: [
  //         {
  //           name: 'Size',
  //           value: 'L',
  //         },
  //         {
  //           name: 'Màu',
  //           value: 'Xanh Navy',
  //         },
  //       ],
  //     },
  //     {
  //       id: 'cff1d1f3-18c4-441a-a1b6-b030a6a19dfd',
  //       product_id: '45ad91f4-06a8-4775-8e5a-1a45e28042c4',
  //       weight: 20,
  //       inventory: 4,
  //       price: 250000,
  //       created_at: '2023-04-06T10:13:00.868Z',
  //       updated_at: '2023-04-06T10:13:00.868Z',
  //       variant_attributes: [
  //         {
  //           name: 'Size',
  //           value: 'M',
  //         },
  //         {
  //           name: 'Màu',
  //           value: 'Xanh Navy',
  //         },
  //       ],
  //     },
  //     {
  //       id: 'cff1d1f3-18c4-441a-a1b6-b030a6a19dfd',
  //       product_id: '45ad91f4-06a8-4775-8e5a-1a45e28042c4',
  //       weight: 20,
  //       inventory: 4,
  //       price: 250000,
  //       created_at: '2023-04-06T10:13:00.868Z',
  //       updated_at: '2023-04-06T10:13:00.868Z',
  //       variant_attributes: [
  //         {
  //           name: 'Size',
  //           value: 'M',
  //         },
  //         {
  //           name: 'Màu',
  //           value: 'Den',
  //         },
  //       ],
  //     },
  //     {
  //       id: 'cff1d1f3-18c4-441a-a1b6-b030a6a19dfd',
  //       product_id: '45ad91f4-06a8-4775-8e5a-1a45e28042c4',
  //       weight: 20,
  //       inventory: 4,
  //       price: 250000,
  //       created_at: '2023-04-06T10:13:00.868Z',
  //       updated_at: '2023-04-06T10:13:00.868Z',
  //       variant_attributes: [
  //         {
  //           name: 'Size',
  //           value: 'ML',
  //         },
  //         {
  //           name: 'Màu',
  //           value: 'Den',
  //         },
  //       ],
  //     },
  //   ],
  // };

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[2]);

  const getColor = (size) => {
    const colorStore = [];
    product.product_variants.forEach((x) => {
      const [size1, color] = x.variant_attributes;
      if (size1.value == size) {
        colorStore.push(color.value);
      }
    });
    return colorStore;
  };

  useEffect(() => {
    const stringQuery = `${process.env.REACT_APP_API_URL}/products/${id}`;
    new APIClient()
      .getWithToken(stringQuery)
      .then((res) => {
        const sizeStore = [];
        res.product_variants.forEach((x) => {
          x.variant_attributes.forEach((y) => {
            if (y.name === 'Size' && !sizeStore.includes(y.value)) sizeStore.push(y.value);
          });
        });
        console.log('res ::', res);
        setSizes(sizeStore);
        setProduct(res);
      })
      .catch((e) => console.log('e ::', e));
  }, []);
  if (!product) return <h1>Loading...</h1>;
  return (
    <>
      <div className="bg-white">
        <div className="pb-16 pt-6 sm:pb-24">
          <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
              <div className="lg:col-span-5 lg:col-start-8">
                <div className="flex justify-between">
                  <h1 className="text-xl font-medium text-gray-900">{product.name}</h1>
                  <p className="text-xl font-medium text-gray-900">{product.price}</p>
                </div>
              </div>

              {/* Image gallery */}
              <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                <h2 className="sr-only">Images</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                  {product.product_images.map((x, index) => (
                    <img
                      key={x.external_id}
                      src={x.url}
                      alt={x.external_name}
                      className={classNames(
                        index == 0 ? 'lg:col-span-2 lg:row-span-2' : 'hidden lg:block',
                        'rounded-lg'
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-8 lg:col-span-5">
                <form>
                  {/* Size picker */}
                  <div className="mt-8 mb-8">
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm font-medium text-gray-900">Size</h2>
                    </div>

                    <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-2">
                      <RadioGroup.Label className="sr-only"> Choose a size </RadioGroup.Label>
                      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                        {sizes.map((size, index) => (
                          <RadioGroup.Option
                            key={index}
                            value={size}
                            onClick={() => {
                              setVariant({ ...variant, size });
                            }}
                            className={({ active, checked }) =>
                              classNames(
                                'cursor-pointer focus:outline-none',
                                active ? 'ring-2 ring-indigo-500 ring-offset-2' : '',
                                checked
                                  ? 'border-transparent bg-indigo-600 text-white hover:bg-indigo-700'
                                  : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50',
                                'flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1 text-black'
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
                      <h2 className="text-sm font-medium text-gray-900">Color</h2>

                      <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-2">
                        <RadioGroup.Label className="sr-only"> Choose a color </RadioGroup.Label>
                        <div className="flex items-center space-x-3">
                          {getColor(variant.size).map((x, index) => (
                            <RadioGroup.Option
                              key={index}
                              value={x}
                              className={({ active, checked }) =>
                                classNames(
                                  'ring-gray-900',
                                  active && checked ? 'ring ring-offset-1' : '',
                                  !active && checked ? 'ring-2' : '',
                                  'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                                )
                              }
                            >
                              <RadioGroup.Label as="span" className="sr-only">
                                {' '}
                                {1}{' '}
                              </RadioGroup.Label>
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  'bg-gray-900',
                                  'h-8 w-8 rounded-full border border-black border-opacity-10'
                                )}
                              />
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add to cart
                  </button>
                </form>

                {/* Product details */}
                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Description</h2>
                  <div
                    className="prose prose-sm mt-4 text-gray-500"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>

                <div className="mt-8 border-t border-gray-200 pt-8">
                  <h2 className="text-sm font-medium text-gray-900">Fabric &amp; Care</h2>

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
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
