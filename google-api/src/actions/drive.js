"use strict";

import assign from "object-assign"
import fetch from "isomorphic-fetch"
import checkStatus from "../utils/check-status"


function callAPI(url, options = {}) {
  const params = assign({}, {credentials: "include"}, options);

  return fetch(url, params)
    .then(checkStatus)
    .then(res => res.json());
}


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
    return callAPI("/api/")
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
    isFetching: true,
    name,
    content
  };
}

function receiveAddItemSuccess(item) {
  return {
    type: RECEIVE_ADD_ITEM_SUCCESS,
    isFetching: false,
    item
  };
}

function receiveAddItemFailure() {
  return {
    type: RECEIVE_ADD_ITEM_FAILURE,
    isFetching: false
  };
}

export function addItem(name, content) {
  const data = new FormData();
  data.append("name", name);
  data.append("content", content);

  return (dispatch) => {
    dispatch(requestAddItem(name, content));
    return callAPI("/api/", {
        method: "POST",
        body: data
      })
      .then((res) => {
        dispatch(receiveAddItemSuccess(res));
      })
      .catch((error) => {
        dispatch(receiveAddItemFailure());
      });
  };
}


// Delete
export const REQUEST_DELETE_ITEM = "REQUEST_DELETE_ITEM";
export const RECEIVE_DELETE_ITEM_SUCCESS = "RECEIVE_DELETE_ITEM_SUCCESS";
export const RECEIVE_DELETE_ITEM_FAILURE = "RECEIVE_DELETE_ITEM_FAILURE";

function requestDeleteItem(id) {
  return {
    type: REQUEST_DELETE_ITEM,
    isFetching: true,
    id
  };
}

function receiveDeleteItemSuccess(id) {
  return {
    type: RECEIVE_DELETE_ITEM_SUCCESS,
    isFetching: false,
    id
  };
}

function receiveDeleteItemFailure() {
  return {
    type: RECEIVE_DELETE_ITEM_FAILURE,
    isFetching: false
  };
}

export function deleteItem(id) {
  return (dispatch) => {
    dispatch(requestDeleteItem(id));
    return callAPI(`/api/${id}`, {
        method: "DELETE"
      })
      .then((res) => {
        dispatch(receiveDeleteItemSuccess(id));
      })
      .catch((error) => {
        dispatch(receiveDeleteItemFailure());
      });
  };
}
