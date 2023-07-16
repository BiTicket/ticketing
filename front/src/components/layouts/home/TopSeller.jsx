import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import img_people_01 from "../../../assets/images/people/01.jpg";
import img_people_02 from "../../../assets/images/people/02.jpg";
import img_people_03 from "../../../assets/images/people/03.jpg";
import img_people_04 from "../../../assets/images/people/04.jpg";
import img_people_05 from "../../../assets/images/people/05.jpg";
import img_people_06 from "../../../assets/images/people/06.jpg";

const TopSeller = () => {
  const [dataTopSellerTab] = useState([
    {
      title: "24 Hours",
    },
    {
      title: "Week",
    },
    {
      title: "Month",
    },
  ]);

  const dataTopSellerPanel = [
    {
      id: 1,
      dataTopSellerContent: [
        {
          img: img_people_01,
          name: "John Smith",
          mail: "@johnsmith",
          top: "1",
          price: "120.7 ETH",
        },
        {
          img: img_people_02,
          name: "Jane Doe",
          mail: "@janedoe",
          top: "4",
          price: "120.7 ETH",
        },
        {
          img: img_people_04,
          name: "Michael Johnson",
          mail: "@michaeljohnson",
          top: "7",
          price: "120.7 ETH",
        },
        // Add more works for Artist 1...
      ],
    },
    {
      id: 2,
      dataTopSellerContent: [
        {
          img: img_people_03,
          name: "Emily Brown",
          mail: "@emilybrown",
          top: "1",
          price: "120.7 ETH",
        },
        {
          img: img_people_05,
          name: "David Lee",
          mail: "@davidlee",
          top: "3",
          price: "120.7 ETH",
        },
        {
          img: img_people_06,
          name: "Sophia Hernandez",
          mail: "@sophiahernandez",
          top: "5",
          price: "120.7 ETH",
        },
        // Add more works for Artist 2...
      ],
    },
    {
      id: 3,
      dataTopSellerContent: [
        {
          img: img_people_04,
          name: "Robert Turner",
          mail: "@robertturner",
          top: "1",
          price: "120.7 ETH",
        },
        {
          img: img_people_02,
          name: "Olivia Williams",
          mail: "@oliviawilliams",
          top: "4",
          price: "120.7 ETH",
        },
        {
          img: img_people_05,
          name: "James Davis",
          mail: "@jamesdavis",
          top: "7",
          price: "120.7 ETH",
        },
        // Add more works for Artist 3...
      ],
    },
  ];

  return (
    <section className="tf-section top-seller home bg-style">
      <div className="themesflat-container">
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="heading-next-eventss">
              <h2 className="tf-title pb-16">Top Sellers</h2>
              <a href="/explore" className="exp style2 see-all">
                SEE ALL
              </a>
            </div>
            <div className="flat-tabs seller-tab">
              <Tabs>
                <TabList>
                  {dataTopSellerTab.map((item, index) => (
                    <Tab key={index}>{item.title}</Tab>
                  ))}
                </TabList>

                <div className="content-tab mg-t-24">
                  {dataTopSellerPanel.map((item) => (
                    <TabPanel key={item.id}>
                      {item.dataTopSellerContent.map((item, index) => (
                        <div key={index} className="col-xl-3 col-lg-4 col-md-6">
                          <div className="box-item">
                            <div className="sc-author-box style-3">
                              <div className="author-style2 flex">
                                <div className="author-avatar">
                                  <Link to="#">
                                    <img
                                      src={item.img}
                                      alt="Ticketing"
                                      className="avatar"
                                    />
                                  </Link>
                                  <div className="badge">
                                    <i className="ripple"></i>
                                  </div>
                                </div>
                                <div className="author-infor">
                                  <h5>
                                    <Link to="#">{item.name}</Link>
                                  </h5>
                                  <div className="tag">{item.mail}</div>
                                  <span className="price">{item.price}</span>
                                </div>
                              </div>
                              <div className="action">
                                <div className="number">#{item.top}</div>
                                <div className="btn-follow">
                                  <Link to="/login">Follow</Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabPanel>
                  ))}
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSeller;
