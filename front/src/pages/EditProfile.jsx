import React, {useState} from "react";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import avt from "../assets/images/people/profile.jpg";
import { Web3Storage, File } from 'web3.storage';
import Platform from "../abi/Platform";
import { useAccount } from "wagmi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EditProfile = () => {
  const { address, isConnected } = useAccount();
  const [imageProfile, setImageProfile] = useState("");
  const [nameProfile, setNameProfile] = useState('');
  const [customUrl, setCustomUrl] = useState("");
  const [emailProfile, setEmailProfile] = useState("");
  const [bioProfile, setBioProfile] = useState("");
  const [discord, setDiscord] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");

  const handleNameProfile = (e) => {
    setImageProfile(e.target.value);
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
    const userAssert = { address: address, name: nameProfile, email: emailProfile, bio: bioProfile, discord: discord,twitter: twitter,facebook: facebook,customUrl: customUrl,image: imageProfile};
    const blob = new Blob([JSON.stringify(userAssert)], { type: 'application/json' })
  
    const files = [
      new File(['contents-of-file-1'], 'plain-utf8.txt'),
      new File([blob], 'hello.json')
    ]
    return files
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const client = new Web3Storage({ token: process.env.REACT_APP_WEBSTORAGE });
    const eventupsertUser = eventUpsertUser();
    const cid = await client.put(eventupsertUser);

    //reister user
    try{
      await Platform.methods.upsertUser('https://' + cid + '.ipfs.w3s.link').send({
        from: address, // Use the first account from MetaMask or any other wallet
        gas: 5000000, // Adjust the gas limit as per your contract's requirements

      })

    }catch(error)
    {
      console.log(error);
    }

    toast("🦄 Wow you have updated your data!", {
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

  const handleImageProdile = async (e) => {
    e.preventDefault();
    const client = new Web3Storage({ token: process.env.REACT_APP_WEBSTORAGE });
    const rootCid = await client.put(e.target.files);
    const info = await client.status(rootCid);
    const res = await client.get(rootCid);
    const files = await res.files();


    setImageProfile('https://' + files[0].cid + '.ipfs.w3s.link');
    for (const file of files) {
      console.log(`${file.cid} ${file.name} ${file.size}`)
    }
  };
  
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
      theme="light"
      />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">Edit Profile</h1>
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
                  <img id="profileimg" src={avt} alt="Ticketing" />
                </div>
                <div id="upload-profile">
                  <Link to="#" className="btn-upload">
                    Upload New Photo{" "}
                  </Link>
                  <input
                    id="tf-upload-img"
                    type="file"
                    name="profile"
                    onChange={(e) => handleImageProdile(e)}
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
                        <input type="text" placeholder="Bon Jovi" onChange={(e) => handleNameProfile(e)} required />
                      </fieldset>
                      <fieldset>
                        <h4 className="title-infor-account">Custom URL</h4>
                        <input
                          type="text"
                          placeholder="Ticketing.Bon Jovi.com/"
                          onChange={(e) => handleCustomUrl(e)}
                          required
                        />
                      </fieldset>
                      <fieldset>
                        <h4 className="title-infor-account">Email</h4>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          onChange={(e) => handleEmailProfile(e)}
                          required
                        />
                      </fieldset>
                      <fieldset>
                        <h4 className="title-infor-account">Bio</h4>
                        <textarea tabIndex="4" rows="5" onChange={(e) => handleBioProfile(e)} required></textarea>
                      </fieldset>
                    </div>
                    <div className="info-social">
                      <h4 className="title-create-item">Your Social media</h4>
                      <fieldset>
                        <h4 className="title-infor-account">Facebook</h4>
                        <input
                          type="text"
                          placeholder="Facebook username"
                          onChange={(e) => handleFacebook(e)}
                          required
                        />
                        <Link to="#" className="connect">
                          <i className="fab fa-facebook"></i>Connect to face
                          book
                        </Link>
                      </fieldset>
                      <fieldset>
                        <h4 className="title-infor-account">Twitter</h4>
                        <input
                          type="text"
                          placeholder="Twitter username"
                          onChange={(e) => handleTwitter(e)}
                          required
                        />
                        <Link to="#" className="connect">
                          <i className="fab fa-twitter"></i>Connect to Twitter
                        </Link>
                      </fieldset>
                      <fieldset>
                        <h4 className="title-infor-account">Discord</h4>
                        <input
                          type="text"
                          placeholder="Discord username"
                          onChange={(e) => handleDiscord(e)}
                          required
                        />
                        <Link to="#" className="connect">
                          <i className="icon-fl-vt"></i>Connect to Discord
                        </Link>
                      </fieldset>
                      <fieldset>
                        <h4 className="title-infor-account">
                          Registered Wallet (show only)
                        </h4>
                        <input
                          type="text"
                          disabled
                          placeholder="0x6b4eyPy46b4yx2327ye46b4oe46b4e4"
                          required
                        />
                      </fieldset>
                    </div>
                  </div>
                  <button className="tf-button-submit mg-t-15" onClick={(e) => {
                          handleSubmit(e);
                        }} type="submit">
                    Update Profile
                  </button>
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
