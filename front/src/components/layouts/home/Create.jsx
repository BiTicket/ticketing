import React from "react";
import CreateItem from "../CreateItem";

import icon1 from "../../../assets/images/icon/Wallet.png";
import icon2 from "../../../assets/images/icon/Category.png";
import icon3 from "../../../assets/images/icon/Image2.png";
import icon4 from "../../../assets/images/icon/Bookmark.png";

const Create = () => {
  const data = [
    {
      title: "Add Your Tickets",
      description:
        "Ticketing provides a more interactive and personalized experience for users by allowing them to create, personalize and share exclusive tickets for their events through the BiTicket platform.",
      icon: icon3,
      colorbg: "icon-color3",
    },
    {
      title: "Create Your Collection",
      description:
        "This feature makes it easy for users to have full control over their NFT tickets, allowing them to manage their events and enjoy a more interactive and personalized experience within the BiTicket platform.",
      icon: icon2,
      colorbg: "icon-color2",
    },
    {
      title: "Set Up Your Wallet",
      description:
        'The "Set Up Your Wallet" feature is critical to ensuring transparency and security in transactions and provides users with a reliable and convenient way to participate in the exciting world of NFT tickets within BiTicket.',
      icon: icon1,
      colorbg: "icon-color1",
    },
    {
      title: "List Them For Sale",
      description:
        "Choose between auctions, fixed-price listings, and declining-price listings. You choose how you want to sell your Tickets!",
      icon: icon4,
      colorbg: "icon-color4",
    },
  ];
  return (
    <section className="tf-box-icon next-eventss tf-section style7">
      <div className="themesflat-container">
        <div className="row">
          <div className="col-xl-4 col-lg-12 col-md-12">
            <div className="heading-next-eventss style2 mg-t-3 mg-bt-22">
              <h3 className="heading-fill mg-bt-16">Create Ticket</h3>
              <h2 className="tf-title text-left pb-15">
                Create And Sell Your Tickets
              </h2>
              <p className="content">
                Ticketing allows event organizers to create custom NFT tickets
                for their events and offer them for sale on the platform.
                Organizers can define details such as name, date, location,
                prices, and design options for their tickets.
              </p>
            </div>
          </div>
          <div className="col-xl-8 col-lg-12 col-md-12">
            <div className="sc-box-icon-inner style3 home">
              {data.map((item, index) => (
                <CreateItem key={index} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Create;
