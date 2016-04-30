"use strict";

import assign from "object-assign"
import {
  REQUEST_ITEMS, RECEIVE_ITEMS_SUCCESS, RECEIVE_ITEMS_FAILURE,
  REQUEST_ADD_ITEM, RECEIVE_ADD_ITEM_SUCCESS, RECEIVE_ADD_ITEM_FAILURE
} from "../actions/drive"

export default function drives(state = {
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_ITEMS:
      return assign({}, state, {
        isFetching: true
      });

    case RECEIVE_ITEMS_SUCCESS:
      return assign({}, state, {
        isFetching: false,
        items: action.items
      });

    case RECEIVE_ITEMS_FAILURE:
      return assign({}, state, {
        isFetching: false,
        items: []
      });

    case REQUEST_ADD_ITEM:
      return assign({}, state, {
        isFetching: true
      });

    case RECEIVE_ADD_ITEM_SUCCESS:
      return assign({}, state, {
        isFetching: false,
        items: [...state.items, action.item]
      });

    case RECEIVE_ADD_ITEM_FAILURE:
      return assign({}, state, {
        isFetching: false
      });

    default:
      return state;
  }
}
