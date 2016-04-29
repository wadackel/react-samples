"use strict";

import {combineReducers} from "redux"
import {routerReducer} from "react-router-redux"
import drives from "./drives"

const rootReducer = combineReducers({
  routing: routerReducer,
  auth: (state = {authenticated: false}) => state,
  drives
});

export default rootReducer;
