import React, { useEffect } from "react";
import HeaderHome from "../components/header/HeaderHome";
import Footer from "../components/footer/Footer";
import Category from "../components/layouts/home/Category";
import NextEvents from "../components/layouts/NextEvents";
import TopSeller from "../components/layouts/home/TopSeller";
import Slider from "../components/slider/Slider";
import Create from "../components/layouts/home/Create";

const Home = () => {
  useEffect(() => {
    window.addEventListener("error", (e) => {
      if (
        e.message === "ResizeObserver loop limit exceeded" ||
        e.message === "Script error."
      ) {
        const resizeObserverErrDiv = document.getElementById(
          "webpack-dev-server-client-overlay-div"
        );
        const resizeObserverErr = document.getElementById(
          "webpack-dev-server-client-overlay"
        );
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute("style", "display: none");
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute("style", "display: none");
        }
      }
    });
  }, []);

  return (
    <div className="home">
      <HeaderHome />
      <Slider />
      <NextEvents />
      <Category />
      <TopSeller />
      <Create />
      <Footer />
    </div>
  );
};

export default Home;
