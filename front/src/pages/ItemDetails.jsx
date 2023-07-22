import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";
import { useAccount } from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import NextEvents from "../components/layouts/NextEvents";
import img1 from "../assets/images/avatar/avt-3.jpg";
import img2 from "../assets/images/avatar/avt-11.jpg";
import img3 from "../assets/images/avatar/avt-1.jpg";
import img4 from "../assets/images/avatar/avt-5.jpg";
import img5 from "../assets/images/avatar/avt-7.jpg";
import img6 from "../assets/images/avatar/avt-8.jpg";
import img7 from "../assets/images/avatar/avt-2.jpg";
import imgdetail1 from "../assets/images/events/01.jpg";
import { Web3Storage, File, makeStorageClient } from 'web3.storage';
import Events from "../abi/Events";
import Platform from "../abi/Platform";
import web3 from "../utils/web3";

const ItemDetails02 = () => {
  /* global BigInt */
  const [dataHistory] = useState([
    {
      img: img1,
      name: "Mason Woodward",
      time: "8 hours ago",
      price: "4.89 ETH",
      priceChange: "$12.246",
    },
    {
      img: img2,
      name: "Mason Woodward",
      time: "at 06/10/2021, 3:20 AM",
      price: "4.89 ETH",
      priceChange: "$12.246",
    },
    {
      img: img3,
      name: "Mason Woodward",
      time: "8 hours ago",
      price: "4.89 ETH",
      priceChange: "$12.246",
    },
    {
      img: img4,
      name: "Mason Woodward",
      time: "8 hours ago",
      price: "4.89 ETH",
      priceChange: "$12.246",
    },
    {
      img: img5,
      name: "Mason Woodward",
      time: "8 hours ago",
      price: "4.89 ETH",
      priceChange: "$12.246",
    },
    {
      img: img6,
      name: "Mason Woodward",
      time: "8 hours ago",
      price: "4.89 ETH",
      priceChange: "$12.246",
    },
  ]);
  const { address, isConnected } = useAccount();
  const [event, setEvent] = useState([{}]);
  let [loading, setLoading] = useState(false);
  let [bothOk, setBothOk] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const eventId = queryParams.get('id');

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const retrieveNFTMetadataUri = async (NFTMetadataUri) => {
    console.log(NFTMetadataUri);
    const client = new Web3Storage({ token: process.env.REACT_APP_WEBSTORAGE });
    const cid = NFTMetadataUri;
    const res = await client.get(NFTMetadataUri);
    console.log(`Got a response! [${res.status}] ${res.statusText}`)
    if (!res.ok) {
      throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`)
    }
  
    // unpack File objects from the response
    const files = await res.files()
    for (const file of files) {
      console.log(`${file.cid} -- ${file.path} -- ${file.size}`)
    }
    const response = await fetch(`https://ipfs.io/ipfs/${files[0].cid}`);
    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Failed to fetch JSON from IPFS');
    }
    // Parse the JSON data from the response
    const jsonData = await response.json();
    return jsonData;
  }

  const BuyTicket = async (e) => {
    setBothOk(true);
    setLoading(true);
    e.preventDefault();
    if(isConnected) {
      try
      {
        console.log(event)
        let price1 = BigInt(event.price) * BigInt(1100);
        let price2 = price1 / BigInt(1000);

        await Platform.methods.buyTicket(address,eventId,0,2,1).send(
          {
            from: address, 
            value: price2.toString()
          });
      }
      catch (error) {
        console.log(error);
        setBothOk(false);
      }

      if (bothOk) {
        toast("🦄 You have created an event!", {
          type: "success",
        });
      } else {
        toast("The form has missing info! Review it and try again", {
          type: "error",
        });
      }
      setLoading(false);
      
    }
  };

  const buildEvent = async (index, event) => {
    let myeventData = await retrieveNFTMetadataUri(event.NFTMetadataUri);
    let myTicketData = await retrieveNFTMetadataUri(event.eventMetadataUri);
    console.log(myeventData);
    return {
      id:index,
      img: `https://ipfs.io/ipfs/${myeventData.Image}`,
      imgAuthor: `https://ipfs.io/ipfs/${myeventData.Image}`,
      title: myeventData.Title,
      price: myeventData.priceTicket, 
      nameAuthor: myeventData.nameCreator || 'John Doe',
      description: myeventData.Details,
      category: myeventData.category || 'Music',
      collection: myeventData.collectin,
      nameArtist: myTicketData.NameArtist || 'John Doe',
      tags:'USDT',
      priceChange: `3 DOT`,
      limitTicket: event.limitTicket || 100,
      wishlist: 100,
      imgCollection: `https://ipfs.io/ipfs/${myeventData.Image}`,
      nameCollection: myeventData.Title,
      deadline: event.deadline
    };

  };

  const retrieveEvents = async () => {
    let event = {};
    const totalEvents = await Events.methods.totalEvents().call();
    // for demo propose, hadcode the range
    const events = await Events.methods.getEventByRange(eventId,totalEvents-1).call();
    event = await buildEvent(0,events[0]);
    

    return event;
  };

  //return events
  useEffect(()=> {
    const fetchData = async () => {
      const arrayEvents = await retrieveEvents();
      setEvent(arrayEvents);
      console.log(arrayEvents);
    }
    fetchData();
  },[]);

  return (
    <div className="item-details">
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">
                  {event.title}
                </h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="#">Explore</Link>
                  </li>
                  <li>Item Details</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="tf-section tf-item-details style-2">
        <div className="themesflat-container">
          <div className="row">
            <div className="content-left col-12">
              <div className="media">
                <img src={event.img} alt="Ticketing" />
              </div>
            </div>
            <div className="col-12 content-right">
              <div className="sc-item-details">
                <div className="meta-item">
                  <div className="left">
                    <h2>{event.nameArtist}</h2>
                  </div>
                  <div className="right">
                    <span className="viewed eye mg-r-8">225</span>
                    <span to="/login" className="liked heart wishlist-button">
                      <span className="number-like">100</span>
                    </span>
                  </div>
                </div>
                <div className="client-infor sc-card-product">
                  <div className="meta-info">
                    <div className="author">
                      <div className="avatar">
                        <img src={event.imgCollection} alt="Ticketing" />
                      </div>
                      <div className="info">
                        <span>Type</span>
                        <h6>
                          {" "}
                          <Link to="/author">{event.category}</Link>{" "}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="meta-info">
                    <div className="author">
                      <div className="avatar">
                        <img src={event.imgAuthor} alt="Ticketing" />
                      </div>
                      <div className="info">
                        <span>Created By</span>
                        <h6>
                          {" "}
                          <Link to="/author"> {event.nameAuthor}</Link>{" "}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <p>
                  {event.description}                
                </p>
                <div className="meta-item-details">
                  <div className="item-style-2 item-details">
                    <ul className="list-details">
                      <li>
                        <span>Responsable: </span>
                        <h6>{event.nameAuthor}</h6>{" "}
                      </li>
                      <li>
                        <span>Capacity: </span>
                        <h6>{event.limitTicket}</h6>{" "}
                      </li>
                      {/* <li>
                        <span>Created: </span>
                        <h6>04 April , 2021</h6>{" "}
                      </li> */}
                      <li>
                        <span>Collection: </span>
                        <h6>{event.collection}</h6>{" "}
                      </li>
                    </ul>
                  </div>
                  <div className="item-style-2">
                    <div className="item meta-price">
                      <span className="heading">Tickets from</span>
                      <div className="price">
                        <div className="price-box">
                          <h5>{event.priceChange}</h5>
                          <span>= $12</span>
                        </div>
                      </div>
                    </div>
                    <div className="item count-down">
                      <Countdown date={Date.now() + parseInt(event.deadline)}>
                        <span>You are good to go!</span>
                      </Countdown>
                    </div>
                  </div>
                </div>
                {/* <Link
                  to="/wallet-connect"
                  className="sc-button loadmore style bag fl-button pri-3"
                > */}
                <div className="row">
                  <div className="col-12">
                    <button onClick={(e)=> BuyTicket(e)} disabled={loading} className="sc-button loadmore style bag fl-button pri-3">
                        <span>
                          Purchase tickets
                          <div>
                                <ClipLoader
                                  color={"#36D7B7"}
                                  loading={loading}
                                  css={override}
                                  size={10}
                                />
                          </div>
                        </span>
                    </button>
                  </div>
                </div>
                
                  
                  {loading && bothOk && (
                        <p>We are submiting your data, please wait.</p>
                      )}
                      {loading && !bothOk && (
                        <p>
                          There was an error while uploading your data, try
                          again or contact us.
                        </p>
                      )}
                      {!loading && bothOk && <p>Data has been loaded!</p>}
                {/* </Link> */}
                <div className="flat-tabs themesflat-tabs">
                  <Tabs>
                    <TabList>
                      <Tab>Who else is coming?</Tab>
                      <Tab>Info</Tab>
                      <Tab>Provenance</Tab>
                    </TabList>

                    <TabPanel>
                      <ul className="bid-history-list">
                        {dataHistory.map((item, index) => (
                          <li key={index} item={item}>
                            <div className="content">
                              <div className="client">
                                <div className="sc-author-box style-2">
                                  <div className="author-avatar">
                                    <Link to="#">
                                      <img
                                        src={item.img}
                                        alt="Ticketing"
                                        className="avatar"
                                      />
                                    </Link>
                                    <div className="badge"></div>
                                  </div>
                                  <div className="author-infor">
                                    <div className="name">
                                      <h6>
                                        <Link to="/author">{item.name} </Link>
                                      </h6>{" "}
                                      <span> see details</span>
                                    </div>
                                    <span className="time">{item.time}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="price">
                                <h5>{item.price}</h5>
                                <span>= {item.priceChange}</span>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </TabPanel>
                    <TabPanel>
                      <ul className="bid-history-list">
                        <li>
                          <div className="content">
                            <div className="client">
                              <div className="sc-author-box style-2">
                                <div className="author-avatar">
                                  <Link to="#">
                                    <img
                                      src={img1}
                                      alt="Ticketing"
                                      className="avatar"
                                    />
                                  </Link>
                                  <div className="badge"></div>
                                </div>
                                <div className="author-infor">
                                  <div className="name">
                                    <h6>
                                      {" "}
                                      <Link to="/author">Mason Woodward </Link>
                                    </h6>{" "}
                                    <span> see details</span>
                                  </div>
                                  <span className="time">8 hours ago</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </TabPanel>
                    <TabPanel>
                      <div className="provenance">
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. It has
                          survived not only five centuries, but also the leap
                          into electronic typesetting, remaining essentially
                          unchanged. It was popularised in the 1960s with the
                          release of Letraset sheets containing Lorem Ipsum
                          passages, and more recently with desktop publishing
                          software like Aldus PageMaker including versions of
                          Lorem Ipsum.
                        </p>
                      </div>
                    </TabPanel>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NextEvents />
      <Footer />
    </div>
  );
};

export default ItemDetails02;
