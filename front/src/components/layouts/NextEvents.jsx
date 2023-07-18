import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import Countdown from "react-countdown";
import CardModal from "./CardModal";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

import img_01 from "../../assets/images/events/01.jpg";
import img_02 from "../../assets/images/events/02.jpg";
import img_03 from "../../assets/images/events/03.jpg";
import img_04 from "../../assets/images/events/04.jpg";
import img_05 from "../../assets/images/events/05.jpg";
import img_06 from "../../assets/images/events/06.jpg";
import img_07 from "../../assets/images/events/07.jpg";
import img_08 from "../../assets/images/events/08.jpg";

import img_people_01 from "../../assets/images/people/01.jpg";
import img_people_02 from "../../assets/images/people/02.jpg";
import img_people_03 from "../../assets/images/people/03.jpg";
import img_people_04 from "../../assets/images/people/04.jpg";
import img_people_05 from "../../assets/images/people/05.jpg";
import img_people_06 from "../../assets/images/people/06.jpg";

const NextEvents = () => {
  const [data] = useState([
    {
      imgCard: img_01,
      imgAuthor: img_people_01,
      title: "Flame Dress' by Balmain... ",
      tags: "spo",
      nameAuthor: "Travis Pastrana",
      price: "1.89 ETH",
      wishlist: "100",
    },
    {
      imgCard: img_02,
      imgAuthor: img_people_02,
      title: "Hamlet Contemplates Contemplates ",
      tags: "con",
      nameAuthor: "Eilish McColgan",
      price: "4.02 ETH",
      wishlist: "100",
    },
    {
      imgCard: img_03,
      imgAuthor: img_people_03,
      title: "Loving Vase 01 by Lanza...",
      tags: "the",
      nameAuthor: "Travis Pastrana",
      price: "3.87 ETH",
      wishlist: "100",
    },
    {
      imgCard: img_04,
      imgAuthor: img_people_01,
      title: "Triumphant awakening...",
      tags: "spo",
      nameAuthor: "Travis Pastrana",
      price: "4.89 ETH",
      wishlist: "100",
    },
    {
      imgCard: img_05,
      imgAuthor: img_people_02,
      title: "Flame Dress' by Balmain...",
      tags: "liv",
      nameAuthor: "Travis Pastrana",
      price: "4.89 ETH",
      wishlist: "100",
    },
    {
      imgCard: img_06,
      imgAuthor: img_people_04,
      title: "Flame Dress' by Balmain... ",
      tags: "the",
      nameAuthor: "Travis Pastrana",
      price: "4.89 ETH",
      wishlist: "100",
    },
    {
      imgCard: img_07,
      imgAuthor: img_people_05,
      title: "Hamlet Contemplates Contemplates ",
      tags: "cir",
      nameAuthor: "Eilish McColgan",
      price: "4.89 ETH",
      wishlist: "100",
    },
    {
      imgCard: img_08,
      imgAuthor: img_people_06,
      title: "Loving Vase 01 by Lanza...",
      tags: "sho",
      nameAuthor: "Travis Pastrana",
      price: "4.89 ETH",
      wishlist: "100",
    },
  ]);

  const [modalShow, setModalShow] = useState(false);
  return (
    <Fragment>
      <section className="tf-section next-eventss">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="heading-next-eventss">
                <h2 className="tf-title pb-23">Next Events</h2>
                <Link to="/explore" className="exp style2">
                  EXPLORE MORE
                </Link>
              </div>
            </div>
            <div className="col-md-12">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={20}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  767: {
                    slidesPerView: 2,
                  },
                  991: {
                    slidesPerView: 3,
                  },
                  1300: {
                    slidesPerView: 5,
                  },
                }}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
              >
                {data.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="swiper-container show-shadow carousel auctions">
                      <div className="swiper-wrapper">
                        <div className="swiper-slide">
                          <div className="slider-item">
                            <div className="sc-card-product menu_card style-h7">
                              <div className="meta-info style">
                                <div className="author">
                                  <div className="avatar">
                                    <img src={item.imgAuthor} alt="Ticketing" />
                                  </div>
                                  <div className="info">
                                    <span>Creator</span>
                                    <h6>
                                      {" "}
                                      <Link to="/author">
                                        {item.nameAuthor}
                                      </Link>{" "}
                                    </h6>
                                  </div>
                                </div>
                                <Link
                                  to="/login"
                                  className="wishlist-button heart"
                                >
                                  <span className="number-like">
                                    {item.wishlist}
                                  </span>
                                </Link>
                              </div>
                              <div className="card-media">
                                <Link to="/item-details">
                                  <img src={item.imgCard} alt="Ticketing" />
                                </Link>
                                <div className="featured-countdown">
                                  <span className="slogan"></span>
                                  <Countdown date={Date.now() + 500000000}>
                                    <span>Expired!</span>
                                  </Countdown>
                                </div>
                                <div className="button-place-bid">
                                  <button
                                    onClick={() => setModalShow(true)}
                                    className="sc-button style-place-bid style bag fl-button pri-3"
                                  >
                                    <span>Buy now</span>
                                  </button>
                                </div>
                              </div>
                              <div className="card-title">
                                <h5>
                                  <Link to="/item-details">"{item.title}</Link>
                                </h5>
                              </div>
                              <div className="meta-info">
                                <div className="author">
                                  <div className="info">
                                    <span>Price</span>
                                    <span className="pricing">
                                      {item.price}
                                    </span>
                                  </div>
                                </div>
                                <div className="tags">{item.tags}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
      <CardModal show={modalShow} onHide={() => setModalShow(false)} />
    </Fragment>
  );
};

export default NextEvents;
