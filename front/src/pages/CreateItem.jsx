import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Select from "react-select";
import { Web3Storage, File } from "web3.storage";
import web3 from "../utils/web3";
import Platform from "../abi/Platform";
import { useAccount } from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";

const CreateItem = () => {
  const { address, isConnected } = useAccount();
  const [imageEvent, setImage] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [activeTabIndex, setActiveTabIndex] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [NameArtist, setNameArtist] = useState("");
  const [placeHappen, setPlaceHappen] = useState("");
  const [paymentCurrency, setPaymentCurrency] = useState(0);
  const [priceValue, setPriceValue] = useState(0);
  const [detailsValue, setDetailsValue] = useState("");
  const [placeLayout, setPlaceLayout] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [totaltickets, setTotalTickets] = useState("");
  const [creatorOfShow, setCreatorOfShow] = useState("");
  const [limitTickets, setLimitTickets] = useState("");
  const [transferable, setTransferable] = useState("");
  const [willNFTAvailable, setWillNFTAvailable] = useState("");
  const [category, setCategory] = useState("");
  const [collection, setCollection] = useState("");
  const [property, setProperty] = useState({
    creator: "",
    eventMetadataUri: "",
    NFTMetadataUri: "",
    ticketsMetadataUris: [],
    ticketsNFTMetadataUris: [],
    prices: [],
    maxSupplies: [],
    deadline: 0,
  });
  let [loading, setLoading] = useState(false);
  let [bothOk, setBothOk] = useState(false);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

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

  const handleCollectionTicketChange = (e) => {
    setCollection(e.target.value);
  };
  const handleCategoryTicketChange = (e) => {
    setCategory(e.target.value);
  };
  const handleCreatorChange = (e) => {
    setCreatorOfShow(e.target.value);
  };
  const handleTitleChange = (e) => {
    setTitleValue(e.target.value);
  };

  const handlesPaymentCurrency = (e) => {
    setPaymentCurrency(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescriptionValue(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPriceValue(web3.utils.toWei(e.target.value));
  };

  const handleDetailsChange = (e) => {
    setDetailsValue(e.target.value);
  };

  const handleInstagramChange = (e) => {
    setInstagram(e.target.value);
  };

  const handleTwitterChange = (e) => {
    setTwitter(e.target.value);
  };
  const handleFacebookChange = (e) => {
    setFacebook(e.target.value);
  };
  const handleTotalTicketChange = (e) => {
    setTotalTickets(e.target.value);
  };
  const handleLimitTicketChange = (e) => {
    setLimitTickets(e.target.value);
  };
  const handleNameArtistChange = (e) => {
    setNameArtist(e.target.value);
  };

  // NFT metada event => Artist, place, etc
  const eventMetaDataUri = () => {
    // You can create File objects from a Blob of binary data
    // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
    // Here we're just storing a JSON object, but you can store images,
    // audio, or whatever you want!
    const obj = {
      NameArtist: NameArtist,
      Place: placeHappen,
      Image: placeLayout,
      paymentCurrency: paymentCurrency,
    };
    const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });

    const files = [new File([blob], "eventData.json")];
    return files;
  };

  //  standard event NFT metadata => Name, Description, Image, etc
  const eventNftMetaDataUri = () => {
    // You can create File objects from a Blob of binary data
    // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
    // Here we're just storing a JSON object, but you can store images,
    // audio, or whatever you want!
    const nftMetaData = {
      Title: titleValue,
      Description: descriptionValue,
      Image: imageEvent,
      Details: detailsValue,
      place: placeLayout,
      nameCreator: creatorOfShow,
      priceTicket: web3.utils.toWei(priceValue, "wei"),
      collectin: collection,
      instagram: instagram,
      twitter: twitter,
      facebook: facebook,
      category: category,
      limitTickets: limitTickets,
    };
    const blob = new Blob([JSON.stringify(nftMetaData)], {
      type: "application/json",
    });

    const files = [new File([blob], "eventData.json")];
    return files;
  };

  // Array of data specific tickets => Type of ticket, location, etc.
  const ticketsMetadataUris = () => {
    // You can create File objects from a Blob of binary data
    // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
    // Here we're just storing a JSON object, but you can store images,
    // audio, or whatever you want!
    const obj = {
      Name: titleValue,
      Details: detailsValue,
      place: placeLayout,
      nameCreator: creatorOfShow,
      collectin: collection,
      instagram: instagram,
      twitter: twitter,
      facebook: facebook,
    };
    const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });

    const files = [new File([blob], "eventData.json")];
    return files;
  };

  const handleSubmit = async (e) => {
    setBothOk(true);
    setLoading(true);
    e.preventDefault();
    const client2 = new Web3Storage({
      token: process.env.REACT_APP_WEBSTORAGE,
    });

    const eventMetadataUri = eventMetaDataUri();
    const cid = await client2.put(eventMetadataUri);

    const eventNftMetadataUri = eventNftMetaDataUri();
    const cidNFTMetadataUri = await client2.put(eventNftMetadataUri);

    //data metadata tickets
    const ticketsMetadataUri = ticketsMetadataUris();
    const cidTicketsMetadataUris = await client2.put(ticketsMetadataUri);

    try {
      //TODO: limit data hardcoded/ check for demo.
      const futureDate = Math.floor(new Date().getTime() / 1000) + 4000000;

      var newEvent = {
        creator: address,
        eventMetadataUri: cid,
        NFTMetadataUri: cidNFTMetadataUri,
        //
        ticketsMetadataUris: [cidTicketsMetadataUris],
        // json name, description, image
        ticketsNFTMetadataUris: [cid],
        // 0:USDTprice, 1:DOTprice, 2:GlimmerPrice
        prices: [
          0,
          0,
          priceValue,
        ],
        maxSupplies: [parseInt(totaltickets)],
        deadline: futureDate,
        percentageWithdraw: 1000,
      };

      //TODO: check if user exist
      await Platform.methods.createEvent(newEvent).send({
        from: address, // Use the first account from MetaMask or any other wallet
        gas: 5000000, // Adjust the gas limit as per your contract's requirements
      });
      toast("🦄 You have created an event!", {
        type: "success",
      });
    } catch (error) {
      console.log("Error: ", error);
      setBothOk(false);
      toast("The form has missing info! Review it and try again", {
        type: "error",
      });
    }

    setLoading(false);
  };

  const handleImage = async (e) => {
    e.preventDefault();
    const client = new Web3Storage({ token: process.env.REACT_APP_WEBSTORAGE });
    const rootCid = await client.put(e.target.files);
    const info = await client.status(rootCid);
    const res = await client.get(rootCid);
    const files = await res.files();

    console.log("info: ", info);

    setProperty({
      ...property,
      eventMetadataUri: files[0].cid,
    });
    setImage(files[0].cid);
    console.log("File cid: ", files[0].cid);
    for (const file of files) {
      console.log(`${file.cid} ${file.name} ${file.size}`);
    }
  };

  const handleImageEvent = async (e) => {
    e.preventDefault();
    const client = new Web3Storage({ token: process.env.REACT_APP_WEBSTORAGE });
    const rootCid = await client.put(e.target.files);
    const info = await client.status(rootCid);
    const res = await client.get(rootCid);
    const files = await res.files();
    console.log("info", info);

    setPlaceLayout(files[0].cid);
    console.log("File cid: ", files[0].cid);
    for (const file of files) {
      console.log(`${file.cid} ${file.name} ${file.size}`);
    }
  };

  return (
    <div className="create-item">
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
                    <input
                      type="text"
                      onChange={(e) => handleTitleChange(e)}
                      placeholder="Item Name"
                    />
                    <h4 className="title-create-item">Name of Artist</h4>
                    <input
                      type="text"
                      onChange={(e) => handleNameArtistChange(e)}
                      placeholder="Item Name"
                    />
                    <h4 className="title-create-item">Prices</h4>
                    <Tabs>
                      <TabList>
                        <Tab onClick={() => handlesPaymentCurrency(0)}>
                          <span className="icon-fl-tag"></span>USDT
                        </Tab>
                        <Tab onClick={() => handlesPaymentCurrency(1)}>
                          <span className="icon-fl-clock"></span>GLIMMER
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
                        <h4 className="title-create-item">Price in GLIMMER</h4>
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
                  <textarea
                    placeholder="e.g. “This is very limited item”"
                    onChange={(e) => handleDescriptionChange(e)}
                  ></textarea>

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
                    <input
                      type="text"
                      placeholder="Instagram"
                      onChange={(e) => handleInstagramChange(e)}
                    />
                    <input
                      type="text"
                      placeholder="Twitter"
                      onChange={(e) => handleTwitterChange(e)}
                    />
                    <input
                      type="text"
                      placeholder="Facebook"
                      onChange={(e) => handleFacebookChange(e)}
                    />
                  </div>
                  <div className="row-form">
                    <div className="inner-row-form">
                      <h4 className="title-create-item">Total tickets</h4>
                      <input
                        type="text"
                        placeholder="e.g. “35000”"
                        onChange={(e) => handleTotalTicketChange(e)}
                      />
                    </div>
                    <div className="inner-row-form">
                      <h4 className="title-create-item">
                        Limit ticket per wallet
                      </h4>
                      <input
                        type="text"
                        placeholder="e.g. “3”"
                        onChange={(e) => handleLimitTicketChange(e)}
                      />
                    </div>
                  </div>
                  <div className="row-form">
                    <div className="inner-row-form">
                      <h4 className="title-create-item">Creator</h4>
                      <input
                        type="text"
                        placeholder="e.g. “Fifa”"
                        onChange={(e) => handleCreatorChange(e)}
                      />
                    </div>
                    <div className="inner-row-form">
                      <h4 className="title-create-item">Category</h4>
                      <input
                        type="text"
                        placeholder="e.g. “Sports”"
                        onChange={(e) => handleCategoryTicketChange(e)}
                      />
                    </div>
                    <div className="inner-row-form">
                      <h4 className="title-create-item">Collection</h4>
                      <input
                        type="text"
                        placeholder="e.g. “Name of NFT collection"
                        onChange={(e) => handleCollectionTicketChange(e)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <button
                        className="tf-button-submit mg-t-150"
                        type="submit"
                        onClick={(e) => {
                          handleSubmit(e);
                        }}
                        disabled={loading || !titleValue || !priceValue}
                      >
                        Create event
                        <div>
                          <ClipLoader
                            color={"#36D7B7"}
                            loading={loading}
                            css={override}
                            size={10}
                          />
                        </div>
                      </button>
                      {loading && bothOk && (
                        <p>We are submiting your data, please wait.</p>
                      )}
                      {loading && !bothOk && (
                        <p>
                          There was an error while uploading your data, try
                          again or contact us.
                        </p>
                      )}
                      {!loading && bothOk && (
                        <p>Data has been submitted successfully!</p>
                      )}
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
