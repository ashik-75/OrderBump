import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import connectDB from "../Database/connectDb.js";
import MerchantData from "../models/MerchantData.js";
import OrderBump from "../models/OrderBump.js";

export const getOrderBumpInfo = expressAsyncHandler(async (req, res) => {
  const readyState = mongoose.connection.readyState;

  if (!readyState) connectDB();

  const { shop } = req.query;

  const response = await OrderBump.findOne({
    shop,
  })
    .populate("autoBump")
    .populate("manualBumps")
    .lean();

  const merchantDataResponse = await MerchantData.findOne({
    shop,
  });

  response["success"] =
    merchantDataResponse?.limit - merchantDataResponse?.usedOrders > 0;

  res.json(response);
});
