import React from "react";
import { Link } from "react-router-dom";

const Sell = () => {
  return (
    <div>
      <div className="prev-next">
        <div className="left">
          <Link to="/">Home</Link>
        </div>
      </div>
      <div className="main-content">
        <div className="product-image">
          <img
            src={require("../images/ramdomDSLR.jpg")}
            id="display-image"
            alt="DSLR"
          ></img>
        </div>
        <div className="product-buy">
          <h1>name</h1>
          <span id="product-id">ID: </span>
          <h2 id="price-display"> Minimum Bid &#8377;</h2>
          <input
            type="text"
            id="input-cart"
            placeholder="     Enter BID"
          ></input>
          <button type="button" id="btn-cart">
            Place BID
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sell;
