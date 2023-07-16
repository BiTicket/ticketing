import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import CardModal from "../components/layouts/CardModal";

import avt from "../assets/images/people/profile.jpg";
import img1 from "../assets/images/people/01.jpg";
import imgCollection1 from "../assets/images/categories/concert2.png";
import img2 from "../assets/images/people/02.jpg";
import imgCollection2 from "../assets/images/categories/sports.png";
import img3 from "../assets/images/people/03.jpg";
import imgCollection3 from "../assets/images/avatar/avt-18.jpg";
import img4 from "../assets/images/people/04.jpg";
import imgCollection4 from "../assets/images/avatar/avt-18.jpg";
import img5 from "../assets/images/people/05.jpg";
import imgCollection5 from "../assets/images/avatar/avt-18.jpg";

const MyProfile = () => {
  const [menuTab] = useState([
    {
      class: "active",
      name: "ATTENDANCE HISTORY",
    },
    {
      class: "",
      name: "MY EVENTS",
    },
    {
      class: "",
      name: "MY COLLECTIONS",
    },
  ]);
  const [panelTab] = useState([
    {
      id: 1,
      dataContent: [
        {
          title: "Metallica",
          tags: "CON",
          imgAuthor: img1,
          nameAuthor: "Tour Concert",
          price: "4.89 ETH",
          priceChange: "$12.246",
          wishlist: "100",
          imgCollection: imgCollection1,
          nameCollection: "Creative Art 3D",
        },
        {
          title: "Motocross competition",
          tags: "Sports",
          imgAuthor: img2,
          nameAuthor: "X Games",
          price: "4.89 ETH",
          priceChange: "$12.246",
          wishlist: "100",
          imgCollection: imgCollection2,
          nameCollection: "Creative Art 3D",
        },
      ],
    },
    {
      id: 2,
      dataContent: [
        {
          id: 2,
          title: "The RenaiXance Rising the sun ",
          tags: "bsc",
          imgAuthor: img3,
          nameAuthor: "FIFA",
          price: "4.89 ETH",
          priceChange: "$12.246",
          wishlist: "100",
          imgCollection: imgCollection2,
          nameCollection: "Creative Art 3D",
        },
        {
          id: 3,
          title: "The RenaiXance Rising the sun ",
          tags: "bsc",
          imgAuthor: img3,
          nameAuthor: "FIFA",
          price: "4.89 ETH",
          priceChange: "$12.246",
          wishlist: "100",
          imgCollection: imgCollection3,
          nameCollection: "Creative Art 3D",
        },
        {
          id: 4,
          title: "The RenaiXance Rising the sun ",
          tags: "bsc",
          imgAuthor: img4,
          nameAuthor: "FIFA",
          price: "4.89 ETH",
          priceChange: "$12.246",
          wishlist: "100",
          imgCollection: imgCollection4,
          nameCollection: "Creative Art 3D",
        },
        {
          id: 5,
          title: "The RenaiXance Rising the sun ",
          tags: "bsc",
          imgAuthor: img5,
          nameAuthor: "FIFA",
          price: "4.89 ETH",
          priceChange: "$12.246",
          wishlist: "100",
          imgCollection: imgCollection5,
          nameCollection: "Creative Art 3D",
        },
      ],
    },
    {
      id: 3,
      dataContent: [
        {
          id: 1,
          title: "NFT 1",
          tags: "bsc",
          imgAuthor: img1,
          nameAuthor: "FIFA",
          price: "4.89 ETH",
          priceChange: "$12.246",
          wishlist: "100",
          imgCollection: imgCollection1,
          nameCollection: "Creative Art 3D",
        },
        {
          id: 3,
          title: "NFT 2",
          tags: "bsc",
          imgAuthor: img3,
          nameAuthor: "FIFA",
          price: "4.89 ETH",
          priceChange: "$12.246",
          wishlist: "100",
          imgCollection: imgCollection3,
          nameCollection: "Creative Art 3D",
        },
        {
          id: 4,
          title: "NFT 3",
          tags: "bsc",
          imgAuthor: img4,
          nameAuthor: "FIFA",
          price: "4.89 ETH",
          priceChange: "$12.246",
          wishlist: "100",
          imgCollection: imgCollection4,
          nameCollection: "Creative Art 3D",
        },
      ],
    },
  ]);

  const [visible, setVisible] = useState(8);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 4);
  };

  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="author">
      <Header />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">My Profile</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="#">Pages</Link>
                  </li>
                  <li>My Profile</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="tf-section author">
        <div className="themesflat-container">
          <div className="flat-tabs tab-author">
            <div className="author-profile flex">
              <div className="feature-profile">
                <img src={avt} alt="Ticketing" className="avatar" />
              </div>
              <div className="infor-profile">
                <span>Hello</span>
                <h2 className="title">Jhonny!</h2>
                <p className="content">Here is your event summary so far.</p>
                <form>
                  <input
                    type="text"
                    className="inputcopy"
                    defaultValue="DdzFFzCqrhshMSxABCdfrge"
                    readOnly
                  />
                  <button type="button" className="btn-copycode">
                    <i className="icon-fl-file-1"></i>
                  </button>
                </form>
              </div>
              <div className="widget-social style-3">
                <div className="btn-profile edit">
                  <Link to="/edit-profile" className="sc-button">
                    Edit profile
                  </Link>
                </div>
              </div>
            </div>
            <Tabs>
              <TabList>
                {menuTab.map((item, index) => (
                  <Tab key={index}>{item.name}</Tab>
                ))}
              </TabList>

              <div className="content-tab">
                <div className="content-inner">
                  <div className="row">
                    {panelTab.map((item, index) => (
                      <TabPanel key={index}>
                        {item.dataContent
                          .slice(0, visible)
                          .map((data, index) => (
                            <div
                              key={index}
                              className="col-xl-3 col-lg-4 col-md-6 col-12"
                            >
                              <div className="sc-card-product explode ">
                                <div className="card-media">
                                  <Link to="/item-details">
                                    <img
                                      src={data.imgCollection}
                                      alt="Ticketing"
                                    />
                                  </Link>
                                  <div className="button-place-bid ">
                                    <button
                                      onClick={() => setModalShow(true)}
                                      className="sc-button style-place-bid style bag fl-button pri-3"
                                    >
                                      <span>Buy now</span>
                                    </button>
                                  </div>
                                  <Link
                                    to="/login"
                                    className="wishlist-button heart"
                                  >
                                    <span className="number-like">
                                      {" "}
                                      {data.wishlist}
                                    </span>
                                  </Link>
                                </div>
                                <div className="card-title mg-bt-16">
                                  <h5>
                                    <Link to="/item-details">
                                      "{data.title}"
                                    </Link>
                                  </h5>
                                </div>
                                <div className="meta-info">
                                  <div className="author">
                                    <div className="avatar">
                                      <img
                                        src={data.imgAuthor}
                                        alt="Ticketing"
                                      />
                                    </div>
                                    <div className="info">
                                      <span>Creator</span>
                                      <h6>
                                        {" "}
                                        <Link to="/author">
                                          {data.nameAuthor}
                                        </Link>{" "}
                                      </h6>
                                    </div>
                                  </div>
                                  <div className="tags">{data.tags}</div>
                                </div>
                                <div className="card-bottom style-explode">
                                  <div className="price">
                                    <span>Current Bid</span>
                                    <div className="price-details">
                                      <h5>{data.price}</h5>
                                      <span>= {data.priceChange}</span>
                                    </div>
                                  </div>
                                  <Link
                                    to="/activity"
                                    className="view-history reload"
                                  >
                                    View History
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))}
                        {visible < item.dataContent.length && (
                          <div className="col-md-12 wrap-inner load-more text-center">
                            <Link
                              to="#"
                              id="load-more"
                              className="sc-button loadmore fl-button pri-3"
                              onClick={showMoreItems}
                            >
                              <span>Load More</span>
                            </Link>
                          </div>
                        )}
                      </TabPanel>
                    ))}
                  </div>
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </section>
      <CardModal show={modalShow} onHide={() => setModalShow(false)} />
      <Footer />
    </div>
  );
};

export default MyProfile;
