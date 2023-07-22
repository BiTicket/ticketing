import React from "react";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import shape1 from "../../assets/images/backgroup-secsion/bg-gradient1.png";
import shape2 from "../../assets/images/backgroup-secsion/bg-gradient2.png";
import shape3 from "../../assets/images/backgroup-secsion/bg-gradient3.png";
import event_01 from "../../assets/images/events/01.jpg";
import event_02 from "../../assets/images/events/02.jpg";
import event_03 from "../../assets/images/events/03.jpg";
import event_04 from "../../assets/images/events/04.jpg";
import event_05 from "../../assets/images/events/05.jpg";
import event_06 from "../../assets/images/events/01.jpg";
import event_07 from "../../assets/images/events/07.jpg";
import event_08 from "../../assets/images/events/08.jpg";
import event_09 from "../../assets/images/events/09.jpg";
import event_10 from "../../assets/images/events/10.jpg";
import event_11 from "../../assets/images/events/11.jpg";
import event_12 from "../../assets/images/events/12.jpg";
import event_13 from "../../assets/images/events/13.jpg";

const Slider = () => {
  const images = [
    event_01,
    event_02,
    event_03,
    event_04,
    event_05,
    event_06,
    event_07,
    event_08,
    event_09,
    event_10,
    event_11,
    event_12,
    event_13,
  ];

  const shuffleArray = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  const randomizedImages_1 = shuffleArray([...images]);
  const randomizedImages_2 = shuffleArray([...images]);

  return (
    <div>
      <section className="flat-title-page style3 mainslider">
        <img className="bgr-gradient gradient1" src={shape1} alt="Ticketing" />
        <img className="bgr-gradient gradient2" src={shape2} alt="Ticketing" />
        <img className="bgr-gradient gradient3" src={shape3} alt="Ticketing" />
        <div className="overlay"></div>
        <div className="themesflat-container ">
          <div className="wrap-heading flat-slider flex">
            <div className="content col-12 col-lg-6">
              <h2 className="heading mt-15">Discover, find,</h2>
              <h1 className="heading mb-style">
                <span className="tf-text s1">and live</span>
              </h1>
              <h1 className="heading">unforgettable events</h1>
              <p className="sub-heading mt-19 mb-40">
                Marketplace For Tickets events Non Fungible Token Tickets
              </p>
              <div className="flat-bt-slider flex style2">
                <Link
                  to="/explore"
                  className="sc-button header-slider style style-1 rocket fl-button pri-1"
                >
                  <span>Explore</span>
                </Link>
                <Link
                  to="/create-item"
                  className="sc-button header-slider style style-1 note fl-button pri-1"
                >
                  <span>Create</span>
                </Link>
              </div>
            </div>
            <Swiper
              modules={[Autoplay]}
              direction={"vertical"}
              spaceBetween={25}
              slidesPerView={13}
              loop
              autoplay={{
                delay: 1,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={1500}
            >
              {randomizedImages_1.map((image, index) => (
                <SwiperSlide key={index}>
                  <img src={image} alt="Ticketing" />
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper
              modules={[Autoplay]}
              direction={"vertical"}
              spaceBetween={25}
              slidesPerView={13}
              loop
              autoplay={{
                delay: 1,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={1000}
            >
              {randomizedImages_2.map((image, index) => (
                <SwiperSlide key={index}>
                  <img src={image} alt="Ticketing" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Slider;
