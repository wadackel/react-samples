"use strict";

import {createStore, combineReducers, compose, applyMiddleware} from "redux"
import {routerReducer, routerMiddleware} from "react-router-redux"
import createLogger from "redux-logger"

export default function configureStore(history, initialState) {
  const reducer = combineReducers({
    routing: routerReducer
  });

  const logger = createLogger();

  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        logger
      )
    )
  );

  return store;
}
