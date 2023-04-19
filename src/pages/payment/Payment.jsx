import { useEffect } from 'react';
import { APIClient } from '../../helper/api_helper';
import { useNavigate } from 'react-router-dom';

export default function Payments() {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const params = {};

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
      imageUrl: 'https://file.hstatic.net/1000376681/file/hinh_10_acbc9b4bf1e2430ab9257d08522334ea.png',

      date: 'Mar 16, 2020',
      datetime: '2020-03-16',
      author: {
        name: 'GHN',
        imageUrl: 'https://theme.hstatic.net/1000376681/1000508169/14/logo-footer.png',
      },
    },
    {
      id: 2,
      title: 'Ví VNPAY',
      href: '#',
      description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      imageUrl:
        'https://media.vov.vn/sites/default/files/styles/large/public/2022-03/gioi-thieu-vi-vnpay-nhan-tien-day-tay.png',

      date: 'Mar 16, 2020',
      datetime: '2020-03-16',
      author: {
        name: 'GHN',
        imageUrl:
          'data:image/png;base64,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',
      },
    },
    {
      id: 3,
      title: 'GROUP 9',
      href: '#',
      description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      imageUrl: 'https://file.hstatic.net/1000376681/file/hinh_10_acbc9b4bf1e2430ab9257d08522334ea.png',

      date: 'Mar 16, 2020',
      datetime: '2023-26-04',
      author: {
        name: 'GHN',
        imageUrl: 'https://theme.hstatic.net/1000376681/1000508169/14/logo-footer.png',
      },
    },
    // More posts...
  ];

  useEffect(() => {
    new APIClient()
      .updateWithToken(`${process.env.REACT_APP_API_URL}/payments/vnpay`, params)
      .then((res) => {
        console.log('res ::', res);
        // navigate('/order');
      })
      .catch((e) => console.log('e :: ', e));
  }, []);
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Giao Dịch Đang Được Thực Hiện</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">Cảm ơn quý khách đã mua hàng</p>
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
