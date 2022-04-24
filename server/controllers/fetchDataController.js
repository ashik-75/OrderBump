import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import MerchantData from "../models/MerchantData.js";
import OrderBump from "../models/OrderBump.js";

export const getOrderBumpInfo = expressAsyncHandler(async (req, res) => {
  const { shop } = req.query;
  const db = await mongoose.connect(process.env.MONGO_URI);

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

  await db.disconnect();
});
