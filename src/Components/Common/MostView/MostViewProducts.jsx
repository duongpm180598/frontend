import { useEffect, useState } from 'react';
import { APIClient } from '../../../helper/api_helper';

import { Navigation, Pagination, Autoplay } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import { NavLink, useNavigate } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './style.css';

export default function MostViewProducts() {
  const [mostViewProducts, setMostViewProducts] = useState([]);
  const navigate = useNavigate();

  const handleShowDetail = (slug) => {
    navigate(`/product-detail/${slug}`, { state: { slug: slug } });
  };

  // call API

  useEffect(() => {
    new APIClient()
      .get(`${process.env.REACT_APP_API_URL}/products/special/most-views?limit=10`)
      .then((res) => {
        const listImage = res.map((x) => ({ thumbnail: x.thumbnail, slug: x.slug }));
        setMostViewProducts(listImage);
      })
      .catch((e) => console.log('err ::', e));
  }, []);

  return (
    <div>
      <p className="text-gray-400 mt-5 text-xl pb-2 border-b-[1px] font-medium">Nhiều Lượt Xem Nhất</p>
      <Swiper
        className="mySwiper"
        modules={[Navigation, Autoplay, Pagination]}
        spaceBetween={50}
        slidesPerView={3}
        breakpoints={{
          300: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },

          1024: {
            slidesPerView: 3,
          },
        }}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {mostViewProducts.map((x, index) => (
          <SwiperSlide className="swiperSlide" key={index} virtualIndex={index}>
            <img onClick={() => handleShowDetail(x.slug)} className="cursor-pointer" src={x.thumbnail} alt="..." />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
