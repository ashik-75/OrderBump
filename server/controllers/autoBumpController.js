import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import AutoBump from "../models/AutoBump.js";
import OrderBump from "../models/OrderBump.js";
import extractShopUrl from "./extractSession.js";

// TODO: Add Auto Bump(test done)
const addAutoBump = expressAsyncHandler(async (req, res) => {
  const db = await mongoose.connect(process.env.MONGO_URI);
  const shopUrl = extractShopUrl(req);

  const autoBump = await AutoBump.create({
    ...req.body,
    orderBump: shopUrl,
  });

  await OrderBump.findOneAndUpdate(
    {
      shopUrl,
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
  const shopUrl = extractShopUrl(req);
  const db = await mongoose.connect(process.env.MONGO_URI);
  const autoBumpId = req.params.autoBumpId;

  console.log({ shopUrl, autoBumpId, body: req.body });

  const updateBump = await AutoBump.findOneAndUpdate(
    {
      _id: autoBumpId,
      orderBump: shopUrl,
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
