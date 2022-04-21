import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import OrderBump from "../models/OrderBump.js";
import extractShopUrl from "./extractSession.js";

// TODO: Get all OrderBump
const getAllOrderBump = expressAsyncHandler(async (req, res) => {
  const db = await mongoose.connect(process.env.MONGO_URI);
  const allOrderBump = await OrderBump.find()
    .populate({
      path: "manualBumps",
      options: {
        sort: {
          createdAt: -1,
        },
      },
    })
    .populate("autoBump");
  res.send(allOrderBump);
  await db.disconnect();
});

// TODO : Get Single Merchant (test done)
const getSingleOrderBump = expressAsyncHandler(async (req, res) => {
  const shopUrl = extractShopUrl(req);

  const db = await mongoose.connect(process.env.MONGO_URI);

  const singleOrderBump = await OrderBump.findOne({
    shopUrl,
  })
    .populate("autoBump")
    .populate({
      path: "manualBumps",
      options: {
        sort: {
          createdAt: -1,
        },
      },
    })
    .sort("-createdAt");

  res.send(singleOrderBump);

  await db.disconnect();
});

// * Add Sidebar Location into orderBump (test done)

const addLocationToOrderBump = expressAsyncHandler(async (req, res) => {
  const shopUrl = extractShopUrl(req);
  console.log({ shopUrl, body: req.body });
  const db = await mongoose.connect(process.env.MONGO_URI);

  const orderBump = await OrderBump.findOneAndUpdate(
    { shopUrl },
    { $set: req.body },
    { new: true }
  );

  res.send(orderBump);
  await db.disconnect;
});

export { getAllOrderBump, getSingleOrderBump, addLocationToOrderBump };
