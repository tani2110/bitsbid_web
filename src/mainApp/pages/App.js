import React from "react";
import "./App.css";
import { useState } from "react";
import Deals from "../components/Deals";
import Carou from "../components/Carou";

//import Upto from "../components/Upto";
import Bgimg from "../components/Bgimg";
import Body from "../components/Body";
///import Brands from "../components/Brands";
import Footer from "../components/Footer";
import P_App from "./P_App";
import WhiteH from "../components/WhiteH";
import GreenH from "../components/GreenH";
import Cart from "./Cart";

function App() {
  return (
    <div>
      {/* <GreenH />
      <WhiteH /> */}
      <Body />

      <Deals text="Todays Best Deals For You!" />
      <Carou />
      <Deals />
      {/*<Cashback />
       <TopCat />
        <Bgimg /> */}

      <Deals />

      <Deals />
      <Footer />
      {/* <P_App />
      <Deals text="Choose By Brand" />
      <Brands />
 */}
      {/* <Cart/> */}
    </div>
  );
}

export default App;
