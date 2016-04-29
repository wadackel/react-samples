"use strict";

import assign from "object-assign"
import {
  REQUEST_ITEMS, FETCHED_ITEMS_SUCCESS, FETCHED_ITEMS_FAILURE
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

    case FETCHED_ITEMS_SUCCESS:
      return assign({}, state, {
        isFetching: false,
        items: action.items
      });

    case FETCHED_ITEMS_FAILURE:
      return assign({}, state, {
        isFetching: false,
        items: []
      });

    default:
      return state;
  }
}
