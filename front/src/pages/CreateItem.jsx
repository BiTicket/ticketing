import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Select from "react-select";
import { Web3Storage, File } from 'web3.storage';
import Platform from "../abi/Platform";
import { useAccount } from "wagmi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const CreateItem = () => {
  const { address, isConnected } = useAccount();
  const [imageEvent, setImage] = useState("");
  const [titleValue, setTitleValue] = useState('');
  const [activeTabIndex, setActiveTabIndex] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [paymentCurrency, setPaymentCurrency] = useState(0);
  const [priceValue, setPriceValue] = useState(0);
  const [detailsValue, setDetailsValue] = useState("");
  const [placeLayout, setPlaceLayout] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [totaltickets, setTotalTickets] = useState("");
  const [limitTickets, setLimitTickets] = useState("");
  const [transferable, setTransferable] = useState("");
  const [willNFTAvailable, setWillNFTAvailable] = useState("");
  const [category, setCategory] = useState("");
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

  const handleTitleChange = (e) => {
    setTitleValue(e.target.value);
  };

  const handlesPaymentCurrency = (e) => {
    setPaymentCurrency(e.target.value);
  }

  const handleDescriptionChange = (e) => {
    setDescriptionValue(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPriceValue(e.target.value);
  };

  const handleDetailsChange = (e) => {
    setDetailsValue(e.target.value);
  }

  const handleInstagramChange = (e) => {
    setInstagram(e.target.value);
  }

  const handleTwitterChange = (e) => {
    setTwitter(e.target.value);
  }
  const handleFacebookChange = (e) => { 
    setFacebook(e.target.value);
  }
  const handleTotalTicketChange = (e) => {
    setTotalTickets(e.target.value);
  }
  const handleLimitTicketChange = (e) => {
    setLimitTickets(e.target.value);
  }

   // NFT metada event => Artist, place, etc
  const eventMetaDataUri = () => {
    // You can create File objects from a Blob of binary data
    // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
    // Here we're just storing a JSON object, but you can store images,
    // audio, or whatever you want!
    const obj = { NameArtist: "Add real value", Place: 'place where event happen', Image: 'https:ipfs' }
    const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })
  
    const files = [
      new File(['contents-of-file-1'], 'plain-utf8.txt'),
      new File([blob], 'hello.json')
    ]
    return files
  }

  //  standard event NFT metadata => Name, Description, Image, etc
  const eventNftMetaDataUri = () => {
    // You can create File objects from a Blob of binary data
    // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
    // Here we're just storing a JSON object, but you can store images,
    // audio, or whatever you want!
    const nftMetaData = { Title: titleValue, Description: descriptionValue, Image: imageEvent }
    const blob = new Blob([JSON.stringify(nftMetaData)], { type: 'application/json' })
  
    const files = [
      new File(['contents-of-file-1'], 'plain-utf8.txt'),
      new File([blob], 'hello.json')
    ]
    return files
  }

  // Array of data specific tickets => Type of ticket, location, etc.
  const ticketsMetadataUris = () => {
    // You can create File objects from a Blob of binary data
    // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
    // Here we're just storing a JSON object, but you can store images,
    // audio, or whatever you want!
    const obj = { Name: titleValue, Details: detailsValue, place: placeLayout, instagram: instagram, twitter: twitter, facebook: facebook }
    const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })
  
    const files = [
      new File(['contents-of-file-1'], 'plain-utf8.txt'),
      new File([blob], 'hello.json')
    ]
    return files
  }

  // Array metadata standard  ticket => Name, Description, Image, etc
  const ticketsNFTMetadataUris = () => {}


  const handleSubmit = async (e) => {
    e.preventDefault();
    const client2 = new Web3Storage({ token: process.env.REACT_APP_WEBSTORAGE });
    
    const eventMetadataUri = eventMetaDataUri();
    const cid = await client2.put(eventMetadataUri);

    const eventNftMetadataUri = eventNftMetaDataUri();
    const cidNFTMetadataUri = await client2.put(eventNftMetadataUri);

    //data metadata tickets
    //const ticketsMetadataUris = ticketsMetadataUris();
    //const cidTicketsMetadataUris = await client2.put(ticketsMetadataUris);

    //const currentDate = new Date();
    //const futureDate = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);
    const futureDate = Math.floor(new Date().getTime() / 1000) + 4000000;

    var newEvent = {
      creator: address,
      eventMetadataUri: 'https://' + cid + '.ipfs.w3s.link', 
      NFTMetadataUri: 'https://' + cidNFTMetadataUri + '.ipfs.w3s.link', 
      //
      ticketsMetadataUris: ['https://' + cid + '.ipfs.w3s.link'], 
      // json name, description, image
      ticketsNFTMetadataUris: ['https://' + cid + '.ipfs.w3s.link'], 
      // 0:USDTprice, 1:DOTprice, 2:GrimmerPrice
      prices: [parseInt(priceValue),parseInt(priceValue),parseInt(priceValue)],  
      maxSupplies: [parseInt(totaltickets)], 
      deadline: futureDate
    };

    //TODO: check if user exist
    
    try{
      await Platform.methods.createEvent(newEvent).send({
        from: address, // Use the first account from MetaMask or any other wallet
        gas: 5000000, // Adjust the gas limit as per your contract's requirements
      });
  
    }
    catch(error){
      console.log(error);
    }
    
    toast("🦄 Wow you have created an event!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    

  }

  const handleImage = async (e) => {
    e.preventDefault();
    const client = new Web3Storage({ token: process.env.REACT_APP_WEBSTORAGE });
    const rootCid = await client.put(e.target.files);
    const info = await client.status(rootCid);
    const res = await client.get(rootCid);
    const files = await res.files();


    setProperty({
      ...property,
      eventMetadataUri: 'https://' + files[0].cid + '.ipfs.w3s.link',
    });
    setImage('https://' + files[0].cid + '.ipfs.w3s.link');
    console.log('https://' + files[0].cid + '.ipfs.w3s.link');
    for (const file of files) {
      console.log(`${file.cid} ${file.name} ${file.size}`)
    }
  };

  const handleImageEvent = async (e) => {
    e.preventDefault();
    const client = new Web3Storage({ token: process.env.REACT_APP_WEBSTORAGE });
    const rootCid = await client.put(e.target.files);
    const info = await client.status(rootCid);
    const res = await client.get(rootCid);
    const files = await res.files();


    setPlaceLayout('https://' + files[0].cid + '.ipfs.w3s.link');
    console.log('https://' + files[0].cid + '.ipfs.w3s.link');
    for (const file of files) {
      console.log(`${file.cid} ${file.name} ${file.size}`)
    }
  };

  return (
    <div className="create-item">
      <Header />
      <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
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
                      onChange={(e) => handleImage(e)}
                    />
                  </label>
                  <div className="flat-tabs tab-create-item">
                    <h4 className="title-create-item">Title</h4>
                    <input type="text"
                     onChange={(e) => handleTitleChange(e)}
                     placeholder="Item Name" />

                    <h4 className="title-create-item">Prices</h4>
                    <Tabs>
                      <TabList>
                        <Tab onClick={() => handlesPaymentCurrency(0)}>
                          <span className="icon-fl-tag"></span>USDT
                        </Tab>
                        <Tab onClick={() => handlesPaymentCurrency(1)}>
                          <span className="icon-fl-clock"></span>GRIMMER
                        </Tab>
                        <Tab onClick={() => handlesPaymentCurrency(2)}>
                          <span className="icon-fl-icon-22"></span>DOT
                        </Tab>
                      </TabList>

                      <TabPanel>
                        <h4 className="title-create-item">Price in USDT</h4>
                        <input
                          type="text"
                          onChange={(e) => handlePriceChange(e)}
                          placeholder="Enter price for one item"
                        />
                      </TabPanel>
                      <TabPanel>
                        <h4 className="title-create-item">Price in GRIMMER</h4>
                        <input
                          type="text"
                          onChange={(e) => handlePriceChange(e)}
                          placeholder="Enter price for one item"
                        />
                      </TabPanel>
                      <TabPanel>
                        <h4 className="title-create-item">Price in DOT</h4>
                        <input
                          type="text"
                          onChange={(e) => handlePriceChange(e)}
                          placeholder="Enter price for one item"
                        />
                      </TabPanel>
                    </Tabs>
                  </div>

                  <h4 className="title-create-item">Description</h4>
                  <textarea placeholder="e.g. “This is very limited item”"
                     onChange={(e) => handleDescriptionChange(e)}></textarea>

                  <h4 className="title-create-item">Details</h4>
                  <textarea 
                    placeholder="e.g. “This is very limited item”"
                    onChange={(e) => handleDetailsChange(e)}
                  ></textarea>

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
                      onChange={(e) => handleImageEvent(e)}
                      name="file"
                    />
                  </label>
                  <h4 className="title-create-item">Social Media</h4>
                  <div className="row-form style-1 social-media-group">
                    <input type="text" placeholder="Instagram" onChange={(e) => handleInstagramChange(e)} />
                    <input type="text" placeholder="Twitter" onChange={(e) => handleTwitterChange(e)} />
                    <input type="text" placeholder="Facebook" onChange={(e)=>handleFacebookChange(e)} />
                  </div>
                  <div className="row-form">
                    <div className="inner-row-form">
                      <h4 className="title-create-item">Total tickets</h4>
                      <input type="text" placeholder="e.g. “35000”" onChange={(e) => handleTotalTicketChange(e)} />
                    </div>
                    <div className="inner-row-form">
                      <h4 className="title-create-item">
                        Limit ticket per wallet
                      </h4>
                      <input type="text" placeholder="e.g. “3”" onChange={(e) => handleLimitTicketChange(e)} />
                    </div>
                  </div>
                  {/* <div className="row-form">
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
                  </div> */}
                  <div className="row">
                    <div className="col-12">
                      <button
                        className="tf-button-submit mg-t-150"
                        type="submit"
                        onClick={(e) => {
                          handleSubmit(e);
                        }}
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
