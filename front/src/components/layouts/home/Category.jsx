import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, A11y } from "swiper";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import art from "../../../assets/images/categories/art.png";
import concert from "../../../assets/images/categories/concert.png";
import kids from "../../../assets/images/categories/kids.png";
import sports from "../../../assets/images/categories/sports.png";
import theatre from "../../../assets/images/categories/theatre.png";
import tech from "../../../assets/images/categories/tech.png";

const Category = () => {
  const [data] = useState([
    {
      title: "Art",
      img: art,
    },
    {
      title: "Concert",
      img: concert,
    },
    {
      title: "Sports",
      img: sports,
    },
    {
      title: "Theatre",
      img: theatre,
    },
    {
      title: "Kids",
      img: kids,
    },
    {
      title: "Tech Talk",
      img: tech,
    },
  ]);
  return (
    <section className="tf-section category">
      <div className="themesflat-container">
        <div className="row">
          <div className="col-md-12">
            <div className="heading-next-eventss">
              <h2 className="tf-title pb-39">Catergories</h2>
            </div>
          </div>
          <div className="col-md-12">
            <Swiper
              modules={[Navigation, Scrollbar, A11y]}
              spaceBetween={25}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                },
                767: {
                  slidesPerView: 4,
                },
                991: {
                  slidesPerView: 6,
                },
              }}
              navigation
              scrollbar={{ draggable: true }}
            >
              {data.map((item, index) => (
                <SwiperSlide key={index}>
                  <CategoryItem item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};
const CategoryItem = (props) => (
  <div className="swiper-container carousel11">
    <div className="swiper-wrapper">
      <div className="swiper-slide">
        <div className="slider-item">
          <div className="sc-categoty">
            <div className="card-media">
              <Link to="#">
                <img src={props.item.img} alt="Ticketing" />
              </Link>
            </div>
            <div className="card-title">
              <Link to="#">
                <h4>{props.item.title}</h4>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Category;
