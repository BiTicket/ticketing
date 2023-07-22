import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Accordion } from "react-bootstrap-accordion";

const FAQ = () => {
  const [data] = useState([
    {
      key: "0",
      show: "show",
      title: "What is an BiTicket?",
      text: "Tickets or non-fungible tokens, are cryptographic assets on blockchain with unique identification codes and metadata that distinguish them from each other. Tickets are unique and not mutually interchangeable, which means no two Tickets are the same.",
    },
    {
      key: "1",
      title: "Customer support is available?",
      text: "We are committed to providing you with the best service. Our customer support team is available to help you at all times.",
    },
    {
      key: "2",
      title: "How do I find my transaction hash?",
      text: "Look up the transaction in your wallet or blockchain explorer to find the unique hash that identifies the transaction. 🔄💳",
    },
    {
      key: "3",
      title: "What are gas fees on Ticketing?",
      text: "Gas fees are fees paid in cryptocurrency to process transactions on a blockchain network, such as Moonbeam. 💸🔥",
    },
  ]);
  return (
    <div>
      <Header />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">FAQ</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="#">Pages</Link>
                  </li>
                  <li>FAQ</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="tf-section wrap-accordion">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                Frequently Asked Questions
              </h2>
              <h5 className="sub-title help-center mg-bt-32 ">
                We are here to help you. Please read our FAQ or contact us.
              </h5>
            </div>
            <div className="col-md-12">
              <div className="flat-accordion2">
                {data.map((item, index) => (
                  <Accordion key={index} title={item.title}>
                    <p>{item.text}</p>
                  </Accordion>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default FAQ;
