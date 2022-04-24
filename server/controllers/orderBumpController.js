import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import returnSessionData from "../index.js";
import OrderBump from "../models/OrderBump.js";

// TODO : Get Single Merchant (test done)
const getSingleOrderBump = expressAsyncHandler(async (req, res) => {
  const db = await mongoose.connect(process.env.MONGO_URI);
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

  await db.disconnect();
});

// * Add Sidebar Location into orderBump (test done)

const addLocationToOrderBump = expressAsyncHandler(async (req, res) => {
  const { shop } = await returnSessionData(req, res);

  const db = await mongoose.connect(process.env.MONGO_URI);

  const orderBump = await OrderBump.findOneAndUpdate(
    { shop },
    { $set: req.body },
    { new: true }
  );

  res.send(orderBump);
  await db.disconnect;
});

export { getSingleOrderBump, addLocationToOrderBump };
