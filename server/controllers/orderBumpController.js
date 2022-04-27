import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import connectDB from "../Database/connectDb.js";
import returnSessionData from "../index.js";
import OrderBump from "../models/OrderBump.js";

// TODO : Get Single Merchant (test done)
const getSingleOrderBump = expressAsyncHandler(async (req, res) => {
  const readyState = mongoose.connection.readyState;

  if (!readyState) connectDB();

  const { shop } = await returnSessionData(req, res);

  const singleOrderBump = await OrderBump.findOne({
    shop,
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
});

// * Add Sidebar Location into orderBump (test done)

const addLocationToOrderBump = expressAsyncHandler(async (req, res) => {
  const readyState = mongoose.connection.readyState;

  if (!readyState) connectDB();

  const { shop } = await returnSessionData(req, res);

  const orderBump = await OrderBump.findOneAndUpdate(
    { shop },
    { $set: req.body },
    { new: true }
  );

  res.send(orderBump);
});

export { getSingleOrderBump, addLocationToOrderBump };
