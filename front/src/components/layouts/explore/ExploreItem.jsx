import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import CardModal from "../CardModal";
import { Web3Storage, File, makeStorageClient } from "web3.storage";
//import Platform from "../abi/Platform";
//import Events from "../abi/Events"
import Events from "../../../abi/Events";

const ExploreItem = (props) => {
  const data = props.data;
  const loading = props.loading;

  const [visible, setVisible] = useState(6);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 6);
  };

  const [modalShow, setModalShow] = useState(false);

  return (
    <Fragment>
      <div className="explore">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="box-explore">
            {data.slice(0, visible).map((item, index) => (
              <div
                className={`sc-card-product explode style2 mg-bt ${
                  item.feature ? "comingsoon" : ""
                } `}
                key={index}
              >
                <div className="card-media">
                  <Link to={`/item-details?id=${item.id}`}>
                    <img src={item.img} alt="Ticketing" />
                  </Link>
                  <Link to={"/login"} className="wishlist-button heart">
                    <span className="number-like">{item.wishlist}</span>
                  </Link>
                  <div className="coming-soon">{item.feature}</div>
                </div>
                <div className="card-title">
                  <h5>
                    <Link to={`/item-details?id=${item.id}`}>
                      "{item.title}"
                    </Link>
                  </h5>
                </div>
                <div className="meta-info">
                  <div className="author">
                    <div className="avatar">
                      <img src={item.imgAuthor} alt="Ticketing" />
                    </div>
                    <div className="info">
                      <span>Creator</span>
                      <h6>
                        {" "}
                        <Link to="/author">{item.nameAuthor}</Link>{" "}
                      </h6>
                    </div>
                  </div>
                  <div className="tags">{item.tags}</div>
                </div>
                <div className="card-bottom style-explode">
                  <div className="price">
                    <span>Price</span>
                    <div className="price-details">
                      <h5>{item.price}</h5>
                      <span>= {item.priceChange}</span>
                    </div>
                  </div>
                  {/* <Link to="/activity" className="view-history reload">
                  View Data
                </Link> */}
                </div>
              </div>
            ))}
          </div>
        )}
        {visible < data.length && (
          <div className="btn-auction center">
            <Link
              to="#"
              id="load-more"
              className="sc-button loadmore fl-button pri-3"
              onClick={showMoreItems}
            >
              <span>Load More</span>
            </Link>
          </div>
        )}
      </div>
      <CardModal show={modalShow} onHide={() => setModalShow(false)} />
    </Fragment>
  );
};

export default ExploreItem;
