import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import avt from "../assets/images/people/profile.jpg";
import { Web3Storage, File, makeStorageClient } from "web3.storage";
import Platform from "../abi/Platform";
import Users from "../abi/Users";
import { useAccount } from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";

const EditProfile = () => {
  const { address, isConnected } = useAccount();
  const [userData, setUserData] = useState([]);
  const [imageProfile, setImageProfile] = useState("");
  const [imageToShowProfile, setImageToShowProfile] = useState("");
  const [nameProfile, setNameProfile] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [emailProfile, setEmailProfile] = useState("");
  const [bioProfile, setBioProfile] = useState("");
  const [discord, setDiscord] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  let [loading, setLoading] = useState(false);
  let [loadingUserData, setLoadingUserData] = useState(false);
  let [bothOk, setBothOk] = useState(false);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const handleNameProfile = (e) => {
    setNameProfile(e.target.value);
  };
  const handleCustomUrl = (e) => {
    setCustomUrl(e.target.value);
  };
  const handleEmailProfile = (e) => {
    setEmailProfile(e.target.value);
  };
  const handleBioProfile = (e) => {
    setBioProfile(e.target.value);
  };
  const handleDiscord = (e) => {
    setDiscord(e.target.value);
  };
  const handleTwitter = (e) => {
    setTwitter(e.target.value);
  };
  const handleFacebook = (e) => {
    setFacebook(e.target.value);
  };

  //  standard event NFT metadata => Name, Description, Image, etc
  const eventUpsertUser = () => {
    // You can create File objects from a Blob of binary data
    // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
    // Here we're just storing a JSON object, but you can store images,
    // audio, or whatever you want!
    const userAssert = {
      address: address,
      name: nameProfile,
      email: emailProfile,
      bio: bioProfile,
      discord: discord,
      twitter: twitter,
      facebook: facebook,
      customUrl: customUrl,
      image: imageProfile,
    };
    const blob = new Blob([JSON.stringify(userAssert)], {
      type: "application/json",
    });

    const files = [new File([blob], "userdata.json")];
    return files;
  };

  const handleSubmit = async (e) => {
    setBothOk(true);
    setLoading(true);
    e.preventDefault();
    const client = new Web3Storage({ token: process.env.REACT_APP_WEBSTORAGE });
    const eventupsertUser = eventUpsertUser();
    try {
      const cid = await client.put(eventupsertUser);
      //register/update user
      const reg = await Platform.methods.upsertUser(cid).send({
        from: address, // Use the first account from MetaMask or any other wallet
        gas: 5000000, // Adjust the gas limit as per your contract's requirements
      });
      toast("🦄 You have updated your data!", {
        type: "success",
      });
    } catch (error) {
      toast("The form has missing info! Review it and try again", {
        type: "error",
      });
      console.log("Error while registering user", error);
      setBothOk(false);
    }

    setLoading(false);
  };

  const handleImageProfile = async (e) => {
    e.preventDefault();
    const client = new Web3Storage({ token: process.env.REACT_APP_WEBSTORAGE });
    const rootCid = await client.put(e.target.files);
    const res = await client.get(rootCid);
    try {
      const files = await res.files();
      setImageProfile(files[0].cid);
      for (const file of files) {
        console.log(`${file.cid} ${file.name} ${file.size}`);
      }
    } catch {
      console.log("Error while uploading image");
    }
  };

  useEffect(() => {
    const retrieveFiles = async () => {
      const client = new Web3Storage({
        token: process.env.REACT_APP_WEBSTORAGE,
      });
      const cid = await Users.methods.users(address).call();
      const res = await client.get(cid);
      console.log(`Got a response! [${res.status}] ${res.statusText}`);
      if (res.status == 404) {
        return;
      }
      if (!res.ok) {
        throw new Error(
          `failed to get ${cid} - [${res.status}] ${res.statusText}`
        );
      }

      try {
        // unpack File objects from the response
        const files = await res.files();
        for (const file of files) {
          console.log(`${file.cid} -- ${file.path} -- ${file.size}`);
        }
        //const jsonData = await files[0].json();
        console.log(files);
        const response = await fetch(`https://ipfs.io/ipfs/${files[0].cid}`);
        // Check if the response is successful
        if (!response.ok) {
          throw new Error("Failed to fetch JSON from IPFS");
        }
        // Parse the JSON data from the response
        const jsonData = await response.json();
        console.log("UserData:", jsonData);
        setNameProfile(jsonData.name);
        setCustomUrl(jsonData.customUrl);
        setEmailProfile(jsonData.email);
        setBioProfile(jsonData.bio);
        setDiscord(jsonData.discord);
        setTwitter(jsonData.twitter);
        setFacebook(jsonData.facebook);
        if (jsonData.image) {
          setImageToShowProfile(`https://${jsonData.image}.ipfs.w3s.link`);
        }
      } catch {
        console.log("Error while retrieving user data");
      }
      setLoadingUserData(false);
    };
    setLoadingUserData(true);
    retrieveFiles();
  }, [address]);

  return (
    <div>
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
        theme="dark"
      />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">
                  Edit Profile
                  <ClipLoader
                    color={"#36D7B7"}
                    loading={loadingUserData}
                    css={override}
                    size={30}
                  />
                </h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="#">Pages</Link>
                  </li>
                  <li>Edit Profile</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="tf-create-item tf-section">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-6 col-12">
              <div className="sc-card-profile text-center">
                <div className="card-media">
                  <img
                    id="profileimg"
                    src={imageToShowProfile || avt}
                    alt="Ticketing"
                  />
                </div>
                <div id="upload-profile">
                  <Link to="#" className="btn-upload">
                    Upload New Photo{" "}
                  </Link>
                  <input
                    id="tf-upload-img"
                    type="file"
                    name="profile"
                    onChange={(e) => handleImageProfile(e)}
                    required=""
                  />
                </div>
                <Link to="#" className="btn-upload style2">
                  Delete
                </Link>
              </div>
            </div>
            <div className="col-xl-9 col-lg-8 col-md-12 col-12">
              <div className="form-upload-profile">
                <form action="#" className="form-profile">
                  <div className="form-infor-profile">
                    <div className="info-account">
                      <h4 className="title-create-item">Account info</h4>
                      <fieldset>
                        <h4 className="title-infor-account">Display name</h4>
                        <input
                          type="text"
                          placeholder="Bon Jovi"
                          value={nameProfile}
                          onChange={(e) => handleNameProfile(e)}
                          required
                        />
                      </fieldset>
                      <fieldset>
                        <h4 className="title-infor-account">Custom URL</h4>
                        <input
                          type="text"
                          placeholder="ticketing.com/me"
                          value={customUrl}
                          onChange={(e) => handleCustomUrl(e)}
                          required
                        />
                      </fieldset>
                      <fieldset>
                        <h4 className="title-infor-account">Email</h4>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={emailProfile}
                          onChange={(e) => handleEmailProfile(e)}
                          required
                        />
                      </fieldset>
                      <fieldset>
                        <h4 className="title-infor-account">Bio</h4>
                        <textarea
                          tabIndex="4"
                          rows="5"
                          value={bioProfile}
                          onChange={(e) => handleBioProfile(e)}
                          required
                        ></textarea>
                      </fieldset>
                    </div>
                    <div className="info-social">
                      <h4 className="title-create-item">Your Social media</h4>
                      <fieldset>
                        <h4 className="title-infor-account">Facebook</h4>
                        <input
                          type="text"
                          placeholder="Facebook username"
                          value={facebook}
                          onChange={(e) => handleFacebook(e)}
                          required
                        />
                      </fieldset>
                      <fieldset>
                        <h4 className="title-infor-account">Twitter</h4>
                        <input
                          type="text"
                          placeholder="Twitter username"
                          value={twitter}
                          onChange={(e) => handleTwitter(e)}
                          required
                        />
                      </fieldset>
                      <fieldset>
                        <h4 className="title-infor-account">Discord</h4>
                        <input
                          type="text"
                          placeholder="Discord username"
                          value={discord}
                          onChange={(e) => handleDiscord(e)}
                          required
                        />
                      </fieldset>
                      <fieldset>
                        <h4 className="title-infor-account">
                          Registered Wallet (show only)
                        </h4>
                        <input
                          type="text"
                          disabled
                          value={address}
                          placeholder="0x6b4eyPy46b4yx2327ye46b4oe46b4e4"
                          required
                        />
                      </fieldset>
                    </div>
                  </div>
                  <button
                    className="tf-button-submit mg-t-15"
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                    type="submit"
                    disabled={loading}
                  >
                    Update Profile
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
                      There was an error while uploading your data, try again or
                      contact us.
                    </p>
                  )}
                  {!loading && bothOk && <p>Data has been loaded!</p>}
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

export default EditProfile;
