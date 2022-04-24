import Shopify from "@shopify/shopify-api";
import express from "express";

const checkRoute = express.Router();

checkRoute.get("/", async (req, res) => {
  const decode = await Shopify.Utils.loadCurrentSession(req, res);
  console.log("here is Decode", decode);
  res.send("Check routes");
});

export default checkRoute;
