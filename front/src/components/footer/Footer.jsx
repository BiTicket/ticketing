import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logodark from "../../assets/images/logo/logo_dark_footer.png";
const Footer = () => {
  const accountList = [
    {
      title: "My Profile",
      link: "/my-profile",
    },
    {
      title: "Edit Profile",
      link: "/edit-profile",
    },
    {
      title: "Create Event",
      link: "/create-item",
    },
  ];
  const resourcesList = [
    {
      title: "Help & Support",
      link: "/help-center",
    },
    {
      title: "Event Details",
      link: "/item-details",
    },
    {
      title: "Event Activity",
      link: "/activity",
    },
  ];
  const companyList = [
    {
      title: "Explore",
      link: "/explore",
    },
    {
      title: "Contact Us",
      link: "/contact",
    },
    {
      title: "FAQ",
      link: "/faq",
    },
  ];
  const socialList = [
    {
      icon: "fab fa-twitter",
      link: "https://twitter.com/BiTicket",
    },
    {
      icon: "fab fa-telegram-plane",
      link: "https://t.me/+Lj-VwkqF_eRkNDYx",
    },
    {
      icon: "fab fa-youtube",
      link: "https://www.youtube.com/channel/UCkcap3gQKp8NICMnSKoZzbQ",
    },
    {
      icon: "fab fa-discord",
      link: "https://discord.gg/mapwbeVc",
    },
  ];

  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div>
      <footer id="footer" className="footer-light-style clearfix bg-style">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-lg-3 col-md-12 col-12">
              <div className="widget widget-logo">
                <div className="logo-footer" id="logo-footer">
                  <Link to="/">
                    <img
                      className="logo-dark"
                      id="logo_footer"
                      src={logodark}
                      alt="ticket-gaming"
                    />
                  </Link>
                </div>
                <p className="sub-widget-logo">
                  Biticket is a platform based on blockchain technology that is
                  dedicated to the issuance, sale, resale, and verification of
                  digital tickets using non-fungible.
                </p>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-5 col-5">
              <div className="widget widget-menu style-1">
                <h5 className="title-widget">My Account</h5>
                <ul>
                  {accountList.map((item, index) => (
                    <li key={index}>
                      <Link to={item.link}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-7 col-7">
              <div className="widget widget-menu style-2">
                <h5 className="title-widget">Resources</h5>
                <ul>
                  {resourcesList.map((item, index) => (
                    <li key={index}>
                      <Link to={item.link}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-5 col-5">
              <div className="widget widget-menu fl-st-3">
                <h5 className="title-widget">Company</h5>
                <ul>
                  {companyList.map((item, index) => (
                    <li key={index}>
                      <Link to={item.link}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-7 col-12">
              <div className="widget widget-subcribe">
                <h5 className="title-widget">Get the latest updates</h5>
                <div className="form-subcribe">
                  <form
                    id="subscribe-form"
                    action="#"
                    method="GET"
                    acceptCharset="utf-8"
                    className="form-submit"
                  >
                    <input
                      name="email"
                      className="email"
                      type="email"
                      placeholder="info@yourgmail.com"
                      required
                    />
                    <button id="submit" name="submit" type="submit">
                      <i className="icon-fl-send"></i>
                    </button>
                  </form>
                </div>
                <div className="widget-social style-1 mg-t32">
                  <ul>
                    {socialList.map((item, index) => (
                      <li key={index}>
                        <Link to={item.link}>
                          <i className={item.icon}></i>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {isVisible && <Link onClick={scrollToTop} to="#" id="scroll-top"></Link>}
    </div>
  );
};

export default Footer;
