"use strict";

import {Router} from "express"
const router = Router();

router.get("/", (req, res) => {
  res.json([
    {id: 1, name: "item1"},
    {id: 2, name: "item2"},
    {id: 3, name: "item3"},
    {id: 4, name: "item4"},
    {id: 5, name: "item5"},
    {id: 6, name: "item6"},
    {id: 7, name: "item7"},
    {id: 8, name: "item8"},
    {id: 9, name: "item9"},
    {id: 10, name: "item10"}
  ]);
});

export default router;
