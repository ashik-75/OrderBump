import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import returnSessionData from "../index.js";
import AutoBump from "../models/AutoBump.js";
import OrderBump from "../models/OrderBump.js";

// TODO: Add Auto Bump(test done)
const addAutoBump = expressAsyncHandler(async (req, res) => {
  const db = await mongoose.connect(process.env.MONGO_URI);
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
  await db.disconnect();
});

// TODO: Update auto Bump (test done)
const updateAutoBump = expressAsyncHandler(async (req, res) => {
  const { shop } = await returnSessionData(req, res);
  const db = await mongoose.connect(process.env.MONGO_URI);
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
  await db.disconnect();
});

export { addAutoBump, updateAutoBump };
