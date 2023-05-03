import { useEffect, useState } from 'react';
import { APIClient } from '../../../helper/api_helper';

import { Navigation, Pagination, Autoplay } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import './style.css';

export default function MostViewProducts() {
  const [mostViewProducts, setMostViewProducts] = useState([]);

  // call API

  useEffect(() => {
    new APIClient()
      .get(`${process.env.REACT_APP_API_URL}/products/special/most-views?limit=10`)
      .then((res) => {
        const listImage = res.map((x) => x.thumbnail);
        setMostViewProducts(listImage);
      })
      .catch((e) => console.log('err ::', e));
  }, []);

  return (
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
          <img className="swiperImage" src={x} alt="..." />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
