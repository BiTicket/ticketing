import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import CreateItem from "../components/layouts/CreateItem";
import { useLocation } from 'react-router-dom';
import img1 from "../assets/images/people/01.jpg";
import img2 from "../assets/images/people/02.jpg";
import img3 from "../assets/images/people/03.jpg";
import img4 from "../assets/images/people/04.jpg";
import img5 from "../assets/images/people/05.jpg";

import icon1 from "../assets/images/icon/Wallet.png";
import icon2 from "../assets/images/icon/Category.png";
import icon3 from "../assets/images/icon/Image2.png";
import icon4 from "../assets/images/icon/Bookmark.png";
import { useAccount } from "wagmi";
import { signMessage } from '@wagmi/core';
import web3 from '../utils/web3';
import Platform from "../abi/Platform";
import Events, {CONTRACT_ADDRESS} from "../abi/Events";
import { Web3Storage, File, makeStorageClient } from 'web3.storage';
import { ethers } from "ethers";
import { CONTRACT_ABI_SCROW } from "../abi/Scrow";

const EscrowCreator = () => {
  const { address, isConnected } = useAccount();
  const [events, setEvents] = useState([]);
  const [dataBox, setDataBox] = useState([]);
  const [eventDetail, setEventDetail] = useState({});
  const [scrow_address, setScrowAddress] = useState('');
  const [deadline, setDeadline] = useState('');
  const [widthDrawAmount, setwidthDrawAmount] = useState(0);
  const [eventIsCancelled, setEventIsCancelled] = useState(false);

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

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const eventId = queryParams.get('eventId');
  console.log(eventId);
  const retrieveAttends = async () => {
    const eventList = [];
    let index =2;
    await Platform.getPastEvents('TicketBought', { filter: {eventId:eventId}, fromBlock: 4756531,
      toBlock: 'latest'},function(error, even){ 
        if(even){
          let index=0;
          even.forEach(element => {
            setDataBox((prevValue) => [...prevValue, {
              img: img1,
              attendee: element.address,
              status: "Purchased ticket",
              time: "At 2:30 PM on 19th June, 2021",
              blocknumber : element.blockNumber,
              icon: "icon-1",
              index: index,
              message: undefined
            }]);
            index++;
          });
        }
        setEvents(even); 
    });
  };

  const validateTicket = async (e, index) => {
    const updateDataBoxMessage = dataBox.map(async (item, i) => {
      if (i == index) {
        const sig = ethers.utils.splitSignature(item.message);
        await Platform.methods.useTicket(item.message,sig.v, sig.r, sig.s).send({from: address});
        return item;
      }
      return item;
    });
  };

  const handleWithdrawValueChange = (e) => {
    setwidthDrawAmount(e.target.value);
  }

  

  const autorizeTicket = async (e, index) => {
    //eventId, Event.address
    e.preventDefault();
    const eventIdBytes = ethers.utils.hexZeroPad(ethers.utils.hexlify(eventId), 4);
	  const ticketTypeBytes = ethers.utils.hexZeroPad(ethers.utils.hexlify(0), 4);
	  const nonce =  Math.floor(Math.random() * 4294967295);
	  const nonceBytes = ethers.utils.hexZeroPad(ethers.utils.hexlify(nonce), 4);
    
    const message = ethers.utils.hexConcat([CONTRACT_ADDRESS, eventIdBytes, ticketTypeBytes, nonceBytes])
    
    const signature = await signMessage({
      message: message,
    });
    const updateDataBoxMessage = dataBox.map((item, i) => {
      if (i == index) {
        item.message = signature;
      }
      return item;
    });
    setDataBox(updateDataBoxMessage);
  };

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

  const buildEvent = async (index, event) => {
    let myeventData = await retrieveNFTMetadataUri(event.NFTMetadataUri);
    let myTicketData = await retrieveNFTMetadataUri(event.eventMetadataUri);
    setScrowAddress(event.escrow);
    setDeadline(event.deadline);
    setEventIsCancelled(event.cancelled);
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
      deadline: event.deadline,
      cancelled: event.cancelled
    };
    

  };

  const retrieveEvents = async () => {
    let event = {};
    const totalEvents = await Events.methods.totalEvents().call();
    // for demo propose, hadcode the range
    const events = await Events.methods.getEventByRange(eventId, totalEvents-1).call();
    event = await buildEvent(0,events[0]);
    

    return event;
  };

  const WidthDraw = async (e) => {
    e.preventDefault();
    //if deadline is completed retire 
    if(deadline < Date.now()){
      const screwContract = new web3.eth.Contract(CONTRACT_ABI_SCROW,scrow_address);
      const amountScrow = await web3.eth.getBalance(scrow_address);
      await screwContract.methods.withdrawNative(amountScrow * 0.1).send({from: address});
    }
    else
    {
      //if deadline is not completed, only withdraw the amount
      const screwContract = new web3.eth.Contract(CONTRACT_ABI_SCROW,scrow_address);
      await screwContract.methods.withdrawNative(widthDrawAmount).send({from: address});
    }
  };

  const ReturnFounds = async (e) => {
    e.preventDefault();
    const screwContract = new web3.eth.Contract(CONTRACT_ABI_SCROW,scrow_address);
    const amountScrow = await web3.eth.getBalance(scrow_address);
    await screwContract.methods.returnFunds().send({from: address});
  };

  //return events
  useEffect(()=> {
    const fetchAttends = async() => {
      await retrieveAttends();
    }
    const fetchData = async () => {
      const arrayEvents = await retrieveEvents();
      setEventDetail(arrayEvents);
    };
    fetchAttends();
    fetchData();
  },[]);

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
                  <li>{eventDetail.title}</li>
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
                  {eventDetail.title}
                </h3>
                <p className="content">
                 {eventDetail.description}
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
              {
                                        eventIsCancelled ==false ?
                <form action="#" className="sc-card-activity col-12 col-md-5">
                  <div className="form-escrow col-12">
                    <h4 className="title-escrow">Withdraw</h4>
                    <fieldset>
                      <h4 className="title-infor-account">Amount:</h4>
                      <input type="text" placeholder="500" onChange={(e) => handleWithdrawValueChange(e)} required />
                    </fieldset>
                    <button
                      className="tf-button-submit mg-t-15"
                      type="submit"
                      disabled={false}
                      onClick={(e) => WidthDraw(e)}
                    >
                      Withdraw
                    </button>
                  </div>
                </form>
                :

                <form
                  action="#"
                  className="sc-card-activity col-12 col-md-5 offset-md-1"
                >
                  <div className="form-escrow col-12">
                    <h4 className="title-escrow">Transfer/send Founds</h4>
                    <button
                      className="tf-button-submit mg-t-15"
                      type="submit"
                      onClick={(e) => ReturnFounds(e)}
                      disabled={false}
                    >
                      Send
                    </button>
                  </div>
                </form>
                }
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
                      <div className="time">{item.blockNumber}</div>
                    </div>
                  </div>
                  
                  {
                   item.message == undefined ? 
                    <button className="tf-button-submit mg-t-15" onClick={(e) => autorizeTicket(e, item.index)}>
                      Authorize ticket
                    </button>
                  :
                   <button className="tf-button-submit mg-t-15" onClick={(e) => validateTicket(e, item.index)}>
                      Use Ticket
                    </button>
                  }
                  

                  
                  {/* <div className={`button-active icon ${item.icon}`}></div> */}
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
