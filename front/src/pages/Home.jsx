import React from "react";
import HeaderHome from "../components/header/HeaderHome";
import Footer from "../components/footer/Footer";
import Category from "../components/layouts/home/Category";
import LiveAuction from "../components/layouts/home/LiveAuction";
import TopSeller from "../components/layouts/home/TopSeller";
import Slider from "../components/slider/Slider";
import TodayPicks from "../components/layouts/home/TodayPicks";
import Create from "../components/layouts/home/Create";
import PopularCollection from "../components/layouts/home/PopularCollection";

const Home = () => {
  return (
    <div className="home">
      <HeaderHome />
      <Slider />
      <LiveAuction />
      <Category />
      <TopSeller />
      <TodayPicks />
      <Create />
      <PopularCollection />
      <Footer />
    </div>
  );
};

export default Home;
