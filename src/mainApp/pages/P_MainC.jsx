import React from "react";
import "./P_MainC.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { getToken } from "../components/Log";
import toast, { Toaster } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateBid , updateHighestBid } from "./store";
import { Add } from "./store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSolid,
  faPlus,
  faMinus,
  faLg,
  faFade,
} from "@fortawesome/free-solid-svg-icons";

async function dataReturn(params) {
  const id = params.id;
  const fetchData = await fetch(`http://localhost:3001/products/id/${id}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  });

  const dataRes = await fetchData.json();
  console.log(dataRes);
  return dataRes;
}

function P_MainC() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentCart = useSelector((state) => state.cart.products);
  const params = useParams();
  const [data, setData] = useState(null);
  const [value, setValue] = useState(1);
  const [inputBid, setInputBid] = useState("");
  const productBid = useSelector((state) => state.inputBid);

  
  const typebid = (event) => {
    setInputBid(event.target.value);
  };
  const addToCart = (data) => {
    const newBid = parseInt(inputBid);
    console.log(newBid);
    // dispatch(updateBid({ productId: data._id, newBid }));
    let newData = {
      ...data,
      newBid, // Include the new bid in the payload
      productCount: value
    };
     
    if (value == 0) {
      setValue(1);
      return;
    }
    dispatch(Add(newData));
    dispatch(updateBid({ productId: data._id, newBid }));
    dispatch(updateHighestBid({ productId: data._id, newBid }));
    notify_add();
  };
  const notify_add = () => {
    const myToast1 = toast.success(
      (t) => (
        <span>
          Added to{" "}
          <span
            className="toast-span"
            onClick={() => {
              navigate("/cart");
              toast.dismiss(myToast1);
            }}
          >
            Cart
          </span>
        </span>
      ),
      {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      }
    );
  };
  const notify_log = () => {
    const myToast = toast.error(
      (t) => (
        <span>
          <span
            className="toast-span"
            onClick={() => {
              toast.dismiss(myToast);
            }}
          >
            Please Enter Above Minimum BID
          </span>{" "}
        </span>
      ),
      {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      }
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await dataReturn(params);
      setData(response);
    };

    fetchData();
  }, [params]);

  function handler(data1) {
    if (getToken() == 1) handleBuy(data1);
    else notify_log();
  }
  async function handleBuy(data1) {
    data1.productCount = value;
    const stripePromise = await loadStripe(
      "pk_test_51NNfYPSFJzv4F3NJF6nw8wpnrhEM9q8ilUX1MKbT53ZzqP3AVgkLNaPHB2qPaYpFdtlQvakKoOFqQ1676HlvtmrO008KMPp1xv"
    );
    const res = await fetch(
      `http://localhost:3001/products/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify([data1]),
      }
    );
    // if(res.statusCode === 500) return;

    const data2 = await res.json();
    // console.log(data)

    // toast("Redirect to payment Gateway...!")
    stripePromise.redirectToCheckout({ sessionId: data2 });
    // toast("Redirect to payment Gateway...!")
    const done = await stripePromise.redirectToCheckout({ sessionId: data2 });
    if (done) {
      // code for reducing products;
    }
  }

  if (!data) {
    return <div style={{ height: "90vh" }}>Loading...</div>;
  }
  return (
    <div>
      <div className="prev-next">
        <div className="left">
          <Link to="/">Home</Link> /<span id="product-name">{data.name}</span>
        </div>
      </div>
      <div className="main-content">
        <div className="product-image">
          <img src={data.image} id="display-image" alt="DSLR image"></img>
        </div>
        <div className="product-buy">
          <h1>{data.name}</h1>
          <span id="product-id">ID: {data._id} </span>
          <h2 id="price-display"> Minimum Bid &#8377;{data.price}</h2>
          <input
            type="text"
            id="input-cart"
            placeholder="     Enter BID"
            onChange={typebid}
          ></input>
          <button
            type="button"
            id="btn-cart"
            onClick={() => {
              if (inputBid > data.price) {
                addToCart(data);
                console.log(currentCart);
              } else {
                notify_log();
              }
            }}
            style={{ cursor: "pointer" }}
          >
            Place BID
          </button>
          {/* <button
            type="button"
            id="btn-buy"
            onClick={() => {
              handler(data);
            }}
            style={{ cursor: "pointer" }}
          >
            Place BID
          </button> */}
          <div className="product-info">
            <h3>Product info</h3>
            <p>{data.description}</p>
          </div>
          <hr></hr>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
export default P_MainC;
