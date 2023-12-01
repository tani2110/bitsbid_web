import React from 'react'
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import store from '../pages/store';
import { useSelector, useDispatch } from 'react-redux';
import {increment,decrement} from '../pages/store'
import Log from './Log'

function GreenH() {
  
 
  return (
    <div className="greenH">
        <div className="phone">
          <LocalPhoneRoundedIcon className="phone-icon" />
          +91 1234567890
        </div>
        <div>Get 50% Off on Selected Items | Shop Now</div>
          <Log/>
      </div>
  )
}

export default GreenH