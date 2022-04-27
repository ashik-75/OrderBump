import express from "express";

const demoRoutes = express.Router();

demoRoutes.route("/").get((req, res) => {
  res.send("check load Shopify");
});

export default demoRoutes;
