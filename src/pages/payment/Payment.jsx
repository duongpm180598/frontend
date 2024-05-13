import { useEffect, useState } from 'react';
import { APIClient } from '../../helper/api_helper';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { classNames } from '../../utils';
import GHN_Logo from '../../asset/image/GHN_Logo.webp';
import GHN_BG from '../../asset/image/GHN_BG.webp';
import VNPAY_Logo from '../../asset/image/vnpay_logo.png';
import VNPAY_BG from '../../asset/image/VNPAY_BG.jpeg';
// import ZALOPAY_Logo from '../../asset/image/Zalo_logo.png';
// import ZALOPAY_BG from '../../asset/image/zalo_gb.png';
import { getGateway } from '../../redux/selector';
export default function Payments() {
  const navigate = useNavigate();
  const gateway = useSelector(getGateway);
  const queryParams = new URLSearchParams(window.location.search);
  let params = {};
  const [check, setCheck] = useState(false);
  for (const [key, value] of queryParams.entries()) {
    params[key] = value;
  }
  const posts = [
    {
      id: 1,
      title: 'Giao Hàng Nhanh',
      href: '#',
      description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      imageUrl: GHN_BG,

      date: 'Mar 16, 2020',
      datetime: '2020-03-16',
      author: {
        name: 'GHN',
        imageUrl: GHN_Logo,
      },
    },
    {
      id: 2,
      title: 'Ví VNPAY',
      href: '#',
      description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      imageUrl: VNPAY_BG,

      date: 'Mar 16, 2020',
      datetime: '2020-03-16',
      author: {
        name: 'VNPAY',
        imageUrl: VNPAY_Logo,
      },
    },
    // {
    //   id: 3,
    //   title: 'Ví Zalo PAY',
    //   href: '#',
    //   description:
    //     'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    //   imageUrl: ZALOPAY_BG,

    //   date: 'Mar 16, 2020',
    //   datetime: '2023-26-04',
    //   author: {
    //     name: 'ZALOPAY',
    //     imageUrl: ZALOPAY_Logo,
    //   },
    // },
  ];

  const dispath = useDispatch();
  useEffect(() => {
    let url = '/payments/vnpay';
    if (params.hasOwnProperty('appid')) {
      url = '/payments/zalopay';
      params = {
        ...params,
        amount: Number(params.amount),
        discountamount: Number(params.discountamount),
        appid: Number(params.appid),
        pmcid: Number(params.pmcid),
        status: Number(params.status),
      };
    }

    const timer = setTimeout(() => {
      new APIClient()
        .updateWithToken(`${process.env.REACT_APP_API_URL}${url}`, params)
        .then((res) => {
          const { status } = res;
          if (status == 'PAID') {
            navigate('/order');
          } else if (status == 'REJECTED') {
            alert('Đặt Hàng Không Thành Công');
            navigate('/checkout');
          }
        })
        .catch((e) => {
          console.log('err ::', e);
          alert('Đặt Hàng Không Thành Công');
          navigate('/checkout');
        });
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Giao Dịch Đang Được Thực Hiện</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">Cảm ơn quý khách đã mua hàng </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
            >
              <img src={post.imageUrl} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

              <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                <time dateTime={post.datetime} className="mr-8">
                  {post.date}
                </time>
                <div className="-ml-4 flex items-center gap-x-4">
                  <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <div className="flex gap-x-2.5">
                    <img src={post.author.imageUrl} alt="" className="h-6 w-6 flex-none rounded-full bg-white/10" />
                    {post.author.name}
                  </div>
                </div>
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                <a href={post.href}>
                  <span className="absolute inset-0" />
                  {post.title}
                </a>
              </h3>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
