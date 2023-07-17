import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import CreateItem from "../components/layouts/CreateItem";

import img1 from "../assets/images/people/01.jpg";
import img2 from "../assets/images/people/02.jpg";
import img3 from "../assets/images/people/03.jpg";
import img4 from "../assets/images/people/04.jpg";
import img5 from "../assets/images/people/05.jpg";

import icon1 from "../assets/images/icon/Wallet.png";
import icon2 from "../assets/images/icon/Category.png";
import icon3 from "../assets/images/icon/Image2.png";
import icon4 from "../assets/images/icon/Bookmark.png";

const Activity = () => {
  const [dataBox] = useState([
    {
      img: img1,
      attendee: "Monica Lucas",
      status: "Purchased ticket",
      time: "At 2:30 PM on 19th June, 2021",
      icon: "icon-1",
    },
    {
      img: img2,
      attendee: "Lewis Hamilton",
      status: "Got NFT",
      time: "At 2:30 PM on 19th June, 2021",
      icon: "icon-2",
    },
    {
      img: img3,
      attendee: "Jhon Doe",
      status: "started following",
      time: "At 2:30 PM on 19th June, 2021",
      icon: "icon-3",
    },
    {
      img: img4,
      attendee: "Sarah Doe",
      status: "started following",
      time: "At 2:30 PM on 19th June, 2021",
      icon: "icon-4",
    },
    {
      img: img5,
      attendee: "Alex Doe",
      status: "Purchased ticket",
      time: "At 2:30 PM on 19th June, 2021",
      icon: "icon-5",
    },
    {
      img: img1,
      attendee: "Monica Lucas",
      status: "Purchased ticket",
      time: "At 2:30 PM on 19th June, 2021",
      icon: "icon-1",
    },
    {
      img: img2,
      attendee: "Alejandro",
      status: "Transfered ticket",
      time: "At 2:30 PM on 19th June, 2021",
      icon: "icon-2",
    },
    {
      img: img3,
      attendee: "Calvin Harris",
      status: "Purchased ticket",
      time: "At 2:30 PM on 19th June, 2021",
      icon: "icon-3",
    },
    {
      img: img4,
      attendee: "Sheila Doe",
      status: "started following",
      time: "At 2:30 PM on 19th June, 2021",
      icon: "icon-4",
    },
    {
      img: img5,
      attendee: "Wayne Doe",
      status: "sGot NFT",
      time: "At 2:30 PM on 19th June, 2021",
      icon: "icon-5",
    },
  ]);

  const data = [
    {
      title: "Tickets Sold",
      description: "People have bought a total of 28983 tickets to the event.",
      icon: icon3,
      colorbg: "icon-color3",
    },
    {
      title: "NFT claimed",
      description: "A total of 12390 NFT have been claimed by the attendees.",
      icon: icon2,
      colorbg: "icon-color2",
    },
    {
      title: "Interaction",
      description:
        "There has been a total of 1032878 interactions with this event.",
      icon: icon1,
      colorbg: "icon-color1",
    },
    {
      title: "Transfered Tickets",
      description: "There has has been a total of 654 tickets transfered.",
      icon: icon4,
      colorbg: "icon-color4",
    },
  ];

  const [visible, setVisible] = useState(5);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 5);
  };
  return (
    <div>
      <Header />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">Formula 1 Singapure GP</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="#">Event Activity</Link>
                  </li>
                  <li>Formula 1 Singapure GP</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tf-box-icon next-eventss tf-section style7">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-lg-3 col-md-12">
              <div className="heading-next-eventss style2 mg-t-3 mg-bt-22">
                <h3 className="heading-fill mg-bt-16">Event general data</h3>
                <p className="content">
                  This is the general data of the event so far.
                </p>
              </div>
            </div>
            <div className="col-lg-9 col-md-12">
              <div className="sc-box-icon-inner style3">
                {data.map((item, index) => (
                  <CreateItem key={index} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tf-activity s1 tf-section">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-12">
              <h4 class="mg-bt-32">People activity related to the event</h4>
              {dataBox.slice(0, visible).map((item, index) => (
                <div className="sc-card-activity style1" key={index}>
                  <div className="content">
                    <div className="media">
                      <img src={item.img} alt="Ticketing" />
                    </div>
                    <div className="infor">
                      <h3>
                        {" "}
                        <Link to="/item-details">{item.attendee}</Link>
                      </h3>
                      <div className="status">
                        {item.status}{" "}
                        <span className="author">{item.author}</span>
                      </div>
                      <div className="time">{item.time}</div>
                    </div>
                  </div>
                  <div className={`button-active icon ${item.icon}`}></div>
                </div>
              ))}
              {visible < dataBox.length && (
                <div className="col-md-12 wrap-inner load-more text-center">
                  <Link
                    to="#"
                    id="load-more"
                    className="sc-button loadmore fl-button pri-3 mt-10"
                    onClick={showMoreItems}
                  >
                    <span>Load More</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Activity;
