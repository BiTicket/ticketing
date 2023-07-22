import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ExploreLayout from "../components/layouts/explore/Explore";
import widgetSidebarData from "../assets/fake-data/data-widget-sidebar";
import { Web3Storage, File, makeStorageClient } from 'web3.storage';
import Platform from "../abi/Platform";
import Events from "../abi/Events";

const Explore = () => {
  const [eventsList, setEventsList] = useState([{}]);

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

  const buildEvent = async (event) => {
    let myeventData = await retrieveNFTMetadataUri(event.NFTMetadataUri);
    let myTicketData = await retrieveNFTMetadataUri(event.eventMetadataUri);
    console.log(event);
    console.log(myTicketData);
    console.log(myeventData);
    return {
      img: `https://ipfs.io/ipfs/${myeventData.Image}`,
      imgAuthor: `https://ipfs.io/ipfs/${myeventData.Image}`,
      title: myeventData.Title,
      price: '12 USDT',// TODO: harcodeo price because I can't find in SM `${event.Price} USDT`, 
      nameAuthor: myeventData.nameCreator || 'John Doe',
      tags:'USDT',
      priceChange: `3 DOT`,
      wishlist: 100,
      imgCollection: `https://ipfs.io/ipfs/${myeventData.Image}`,
      nameCollection: myeventData.Title
    };

  };

  const retrieveEvents = async () => {
    const eventList = [];
    const totalEvents = await Events.methods.totalEvents().call();
    // for demo propose, hadcode the range
    const events = await Events.methods.getEventByRange(2,totalEvents-1).call();
    console.log(events);
    for(const element of events){
      eventList.push(await buildEvent(element));
    }

    return eventList;
  };

  
  //return events
  useEffect(()=> {
    const fetchData = async () => {
      const arrayEvents = await retrieveEvents();
      setEventsList(arrayEvents);
      
    }
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
                <h1 className="heading text-center">Explore</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="#">Explore</Link>
                  </li>
                  <li>Explore</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ExploreLayout data={widgetSidebarData} myData={eventsList} />
      <Footer />
    </div>
  );
};

export default Explore;
