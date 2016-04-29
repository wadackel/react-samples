"use strict";

import fetch from "isomorphic-fetch"

export const REQUEST_ITEMS = "REQUEST_ITEMS";
export const FETCHED_ITEMS_SUCCESS = "FETCHED_ITEMS_SUCCESS";
export const FETCHED_ITEMS_FAILURE = "FETCHED_ITEMS_FAILURE";

function requestItems() {
  return {
    type: REQUEST_ITEMS
  };
}

function receiveItems(items) {
  return {
    type: FETCHED_ITEMS_SUCCESS,
    items
  }
}

export function fetchItems() {
  return (dispatch) => {
    dispatch(requestItems());
    return fetch("/api/")
      .then(res => res.json())
      .then((items) => {
        dispatch(receiveItems(items));
      });
  };
}
