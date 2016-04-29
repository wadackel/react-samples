"use strict";

import {createStore, combineReducers, compose, applyMiddleware} from "redux"
import {routerMiddleware} from "react-router-redux"
import thunk from "redux-thunk"
import createLogger from "redux-logger"
import rootReducer from "../reducers/"

export default function configureStore(history, initialState) {
  const logger = createLogger();

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        thunk,
        logger
      )
    )
  );

  return store;
}
