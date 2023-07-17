import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Select from "react-select";
import { Web3Storage } from 'web3.storage';
import { Event } from "./abi/Events.js";
import web3 from './utils/web3';

require('dotenv').config();

const CreateItem = () => {
  const [property, setProperty] = useState({
    creator: '',
    eventMetadataUri:'', 
    NFTMetadataUri: '', 
    ticketsMetadataUris: [], 
    ticketsNFTMetadataUris: [], 
    prices: [],  
    maxSupplies: [], 
    deadline: 0
  });

  const options_transferable = [
    { value: false, label: "No, it can not be transfered to others" },
    { value: true, label: "Yes, it can be transfered to others" },
  ];

  const options_visual = [
    {
      value: false,
      label: "No, there won't be a NFT after the event Finishes",
    },
    { value: true, label: "Yes, Will be NFTs after the evnt" },
  ];

  const options_Category = [
    {
      value: "art",
      label: "Art",
    },
    {
      value: "concert",
      label: "Concert",
    },
    {
      value: "kids-Family",
      label: "Kids / Family",
    },
    {
      value: "sports",
      label: "Sports",
    },
    {
      value: "talks-Conference",
      label: "Talks / Conference",
    },
    {
      value: "other",
      label: "Other",
    },
  ];

  const [selectedOption, setSelectedOption] = useState(null);
  const theme = (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      // All possible overrides
      primary: "#343444",
      primary75: "#0C9AFF",
      primary50: "#0294FF",
      primary25: "#0294FF",

      danger: "#DE350B",
      dangerLight: "#FFBDAD",

      neutral0: "#817bc7",
      neutral5: "hsl(0, 0%, 95%)",
      neutral10: "hsl(0, 0%, 90%)",
      neutral20: "hsl(0, 0%, 80%)",
      neutral30: "hsl(0, 0%, 70%)",
      neutral40: "hsl(0, 0%, 60%)",
      neutral50: "hsl(0, 0%, 50%)",
      neutral60: "hsl(0, 0%, 40%)",
      neutral70: "hsl(0, 0%, 30%)",
      neutral80: "hsl(0, 0%, 20%)",
      neutral90: "hsl(0, 0%, 10%)",
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    await Event.methods.createEvent(property).send(
      {
        from: address
      }
    )

  }

  const handleImage = async (e) => {
    e.preventDefault();
    const client = new Web3Storage({ token: process.env.WEBSTORAGE });
    const rootCid = await client.put(e.target.files);
    const info = await client.status(rootCid);
    const res = await client.get(rootCid);
    const files = await res.files();
    setProperty({
      ...property,
      eventMetadataUri: 'https://' + files[0].cid + '.ipfs.w3s.link',
    });
    setImage('https://' + files[0].cid + '.ipfs.w3s.link');
    for (const file of files) {
      console.log(`${file.cid} ${file.name} ${file.size}`)
    }
  };

  return (
    <div className="create-item">
      <Header />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">Create Event</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="#">Pages</Link>
                  </li>
                  <li>Create Event</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="tf-create-item tf-section">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-12">
              <div className="form-create-item">
                <form action="#">
                  <h4 className="title-create-item">
                    Display image (Main cover)
                  </h4>
                  <label className="uploadFile">
                    <span className="filename">
                      PNG, JPG, GIF, WEBP or MP4. Max 200mb.
                    </span>
                    <input
                      type="file"
                      className="inputfile form-control"
                      name="file"
                      onChange={handleImage}
                    />
                  </label>
                  <div className="flat-tabs tab-create-item">
                    <h4 className="title-create-item">Title</h4>
                    <input type="text" placeholder="Item Name" />

                    <h4 className="title-create-item">Prices</h4>
                    <Tabs>
                      <TabList>
                        <Tab>
                          <span className="icon-fl-tag"></span>USDT
                        </Tab>
                        <Tab>
                          <span className="icon-fl-clock"></span>GRIMMER
                        </Tab>
                        <Tab>
                          <span className="icon-fl-icon-22"></span>DOT
                        </Tab>
                      </TabList>

                      <TabPanel>
                        <h4 className="title-create-item">Price in USDT</h4>
                        <input
                          type="text"
                          placeholder="Enter price for one item"
                        />
                      </TabPanel>
                      <TabPanel>
                        <h4 className="title-create-item">Price in GRIMMER</h4>
                        <input
                          type="text"
                          placeholder="Enter price for one item"
                        />
                      </TabPanel>
                      <TabPanel>
                        <h4 className="title-create-item">Price in DOT</h4>
                        <input
                          type="text"
                          placeholder="Enter price for one item"
                        />
                      </TabPanel>
                    </Tabs>
                  </div>

                  <h4 className="title-create-item">Description</h4>
                  <textarea placeholder="e.g. “This is very limited item”"></textarea>

                  <h4 className="title-create-item">Details</h4>
                  <textarea placeholder="e.g. “This is very limited item”"></textarea>

                  <h4 className="title-create-item">
                    Place layout for the event (Seats in place)
                  </h4>
                  <label className="uploadFile">
                    <span className="filename">
                      PNG, JPG, GIF, WEBP or MP4. Max 200mb.
                    </span>
                    <input
                      type="file"
                      className="inputfile form-control"
                      name="file"
                    />
                  </label>
                  <h4 className="title-create-item">Social Media</h4>
                  <div className="row-form style-1 social-media-group">
                    <input type="text" placeholder="Instagram" />
                    <input type="text" placeholder="Twitter" />
                    <input type="text" placeholder="Facebook" />
                  </div>
                  <div className="row-form">
                    <div className="inner-row-form">
                      <h4 className="title-create-item">Total tickets</h4>
                      <input type="text" placeholder="e.g. “35000”" />
                    </div>
                    <div className="inner-row-form">
                      <h4 className="title-create-item">
                        Limit ticket per wallet
                      </h4>
                      <input type="text" placeholder="e.g. “3”" />
                    </div>
                  </div>
                  <div className="row-form">
                    <h4 className="title-create-item">Other details</h4>
                    <div className="select-row">
                      <div className="inner-row-form style-3">
                        <span>Ticket transferable?</span>
                        <Select
                          theme={theme}
                          placeholder={"Ticket transferable?"}
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options_transferable}
                        />
                      </div>
                      <div className="inner-row-form style-3">
                        <span>Will be a NFT available?</span>
                        <Select
                          theme={theme}
                          placeholder={"Ticket transferable?"}
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options_visual}
                        />
                      </div>
                      <div className="inner-row-form style-3">
                        <span>Category?</span>
                        <Select
                          theme={theme}
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options_Category}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <button
                        className="tf-button-submit mg-t-150"
                        type="submit"
                      >
                        Create event
                      </button>{" "}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateItem;
