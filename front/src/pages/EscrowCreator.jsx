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

const EscrowCreator = () => {
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
      title: "Money at Stake",
      description: "The total amount of money at stake is $ 1,000,000.",
      icon: icon2,
      colorbg: "icon-color2",
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
                <h1 className="heading text-center">Escrow contract Details</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="#">Escrow</Link>
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
                <h3 className="heading-fill mg-bt-16">
                  Formula 1 Singapure GP
                </h3>
                <p className="content">
                  Here you can see the details of the escrow contract for the
                  event.
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
              <h4 class="mg-bt-32">Transfer founds</h4>
              <p>
                Remember, you can only withdraw, transfer founds, or perform any
                interaction, after the event is finished.
              </p>
              <div className="row form-escrow-box">
                <form action="#" className="sc-card-activity col-12 col-md-5">
                  <div className="form-escrow col-12">
                    <h4 className="title-escrow">Withdraw</h4>
                    <fieldset>
                      <h4 className="title-infor-account">Amount:</h4>
                      <input type="text" placeholder="500" required />
                    </fieldset>
                    <button
                      className="tf-button-submit mg-t-15"
                      type="submit"
                      disabled={false}
                    >
                      Withdraw
                    </button>
                  </div>
                </form>
                <form
                  action="#"
                  className="sc-card-activity col-12 col-md-5 offset-md-1"
                >
                  <div className="form-escrow col-12">
                    <h4 className="title-escrow">Transfer/send Founds</h4>
                    <fieldset>
                      <h4 className="title-infor-account">Amount:</h4>
                      <input type="text" placeholder="1000" required />
                    </fieldset>
                    <button
                      className="tf-button-submit mg-t-15"
                      type="submit"
                      disabled={false}
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="tf-activity s1 tf-section">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-12">
              <h4 class="mg-bt-32">Buyers / Attendees</h4>
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

export default EscrowCreator;
