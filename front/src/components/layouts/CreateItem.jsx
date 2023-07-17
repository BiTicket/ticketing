import React from "react";
import { Link } from "react-router-dom";

const CreateItem = (props) => (
  <div className="sc-box-icon">
    <div className="image">
      <div className={`icon-create ${props.item.colorbg}`}>
        <img src={props.item.icon} alt="" />
      </div>
    </div>
    <div className="wrap-box">
      <h3 className="heading">
        <Link to="/wallet-connect">{props.item.title}</Link>
      </h3>
      <p className="content">{props.item.description}</p>
    </div>
  </div>
);

export default CreateItem;
