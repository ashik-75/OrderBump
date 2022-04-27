import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import connectDB from "../Database/connectDb.js";
import returnSessionData from "../index.js";
import AutoBump from "../models/AutoBump.js";
import OrderBump from "../models/OrderBump.js";

// TODO: Add Auto Bump(test done)
const addAutoBump = expressAsyncHandler(async (req, res) => {
  const readyState = mongoose.connection.readyState;

  if (!readyState) connectDB();

  const { shop } = await returnSessionData(req, res);

  const autoBump = await AutoBump.create({
    ...req.body,
    orderBump: shop,
  });

  await OrderBump.findOneAndUpdate(
    {
      shop: shop,
    },
    {
      $set: { autoBump: autoBump?._id },
    },
    {
      new: true,
    }
  );

  res.send(autoBump);
});

// TODO: Update auto Bump (test done)
const updateAutoBump = expressAsyncHandler(async (req, res) => {
  const readyState = mongoose.connection.readyState;

  if (!readyState) connectDB();

  const { shop } = await returnSessionData(req, res);

  const autoBumpId = req.params.autoBumpId;

  const updateBump = await AutoBump.findOneAndUpdate(
    {
      _id: autoBumpId,
      orderBump: shop,
    },
    req.body,
    {
      new: true,
    }
  );
  res.send(updateBump);
});

export { addAutoBump, updateAutoBump };
