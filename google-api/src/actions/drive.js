"use strict";

import fetch from "isomorphic-fetch"
import checkStatus from "../utils/check-status"


// List
export const REQUEST_ITEMS = "REQUEST_ITEMS";
export const RECEIVE_ITEMS_SUCCESS = "RECEIVE_ITEMS_SUCCESS";
export const RECEIVE_ITEMS_FAILURE = "RECEIVE_ITEMS_FAILURE";

function requestItems() {
  return {
    type: REQUEST_ITEMS
  };
}

function receiveItemsSuccess(items) {
  console.log(items);
  return {
    type: RECEIVE_ITEMS_SUCCESS,
    items
  };
}

function receiveItemsFailure() {
  return {
    type: RECEIVE_ITEMS_FAILURE
  };
}

export function fetchItems() {
  return (dispatch) => {
    dispatch(requestItems());
    return fetch("/api/", {
        credentials: "include"
      })
      .then(checkStatus)
      .then(res => res.json())
      .then((res) => {
        dispatch(receiveItemsSuccess(res.files));
      })
      .catch((error) => {
        dispatch(receiveItemsFailure());
      });
  };
}


// Add
export const REQUEST_ADD_ITEM = "REQUEST_ADD_ITEM";
export const RECEIVE_ADD_ITEM_SUCCESS = "RECEIVE_ADD_ITEM_SUCCESS";
export const RECEIVE_ADD_ITEM_FAILURE = "RECEIVE_ADD_ITEM_FAILURE";

function requestAddItem(name, content) {
  return {
    type: REQUEST_ADD_ITEM,
    name,
    content
  };
}

function receiveAddItemSuccess(item) {
  return {
    type: RECEIVE_ADD_ITEM_SUCCESS,
    item
  };
}

function receiveAddItemFailure() {
  return {
    type: RECEIVE_ADD_ITEM_FAILURE
  };
}

export function addItem(name, content) {
  const data = new FormData();
  data.append("name", name);
  data.append("content", content);

  return (dispatch) => {
    dispatch(requestAddItem(name, content));
    return fetch("/api/", {
        method: "POST",
        body: data,
        credentials: "include"
      })
      .then(checkStatus)
      .then(res => res.json())
      .then((res) => {
        dispatch(receiveAddItemSuccess(res));
      })
      .catch((error) => {
        dispatch(receiveAddItemFailure());
      });
  };
}
