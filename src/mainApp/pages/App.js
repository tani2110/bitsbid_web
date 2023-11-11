import React from "react";
import "./App.css";

import Deals from "../components/Deals";
import Carou from "../components/Carou";

//import Upto from "../components/Upto";
import Bgimg from "../components/Bgimg";
import Body from "../components/Body";

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
      {/*<Cashback /> */}
      {/*<Bgimg /> 

      <Deals />
      {/*<TopCat />
       <Deals text="Choose By Brand" />
      <Brands /> */}

      <Deals />
      <Footer />
      {/* <P_App /> */}
      {/* <Cart/> */}
    </div>
  );
}

export default App;
