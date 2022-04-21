import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import ManualBump from "../models/ManualBump.js";
import OrderBump from "../models/OrderBump.js";
import extractShopUrl from "./extractSession.js";

// * create Bump Related to merchant (Test Done)
const createManualBump = expressAsyncHandler(async (req, res) => {
  console.log("create manual bumps");
  const shopUrl = extractShopUrl(req);
  const db = await mongoose.connect(process.env.MONGO_URI);

  const manualBump = await ManualBump.create({
    ...req.body,
    orderBump: shopUrl,
  });

  await OrderBump.findOneAndUpdate(
    {
      shopUrl,
    },
    {
      $push: {
        manualBumps: manualBump._id,
      },
    }
  );

  res.send(manualBump);
  await db.disconnect();
});

// TODO: Get Single Bump (test done)
const getSingleManualBump = expressAsyncHandler(async (req, res) => {
  const shopUrl = extractShopUrl(req);
  console.log("show me a single bump", shopUrl);
  const db = await mongoose.connect(process.env.MONGO_URI);
  const manualBumpId = req.params.manualBumpId;

  const singleBump = await ManualBump.findOne({
    _id: manualBumpId,
    orderBump: shopUrl,
  });

  if (singleBump) {
    res.send(singleBump);
  } else {
    res.status(404);
    throw new Error("Manual Bumps Not Found");
  }

  await db.disconnect();
});

// ! Delete Bump Related to Merchant (test done)
const deleteManualBumpp = expressAsyncHandler(async (req, res) => {
  const shopUrl = extractShopUrl(req);
  const manualBumpId = req.params.manualBumpId;

  console.log("request landed", { manualBumpId, shopUrl });

  const db = await mongoose.connect(process.env.MONGO_URI);
  await ManualBump.findOneAndDelete({
    _id: manualBumpId,
    orderBump: shopUrl,
  });
  await OrderBump.findOneAndUpdate(
    {
      shopUrl,
    },
    {
      $pull: {
        manualBumps: manualBumpId,
      },
    }
  );
  res.send("Successfull");
  await db.disconnect();
});

// ? Update Manual Bump Related to OrderBump (test done)
const updateManualBump = expressAsyncHandler(async (req, res) => {
  const db = await mongoose.connect(process.env.MONGO_URI);
  const shopUrl = extractShopUrl(req);

  const manualBumpId = req.params?.manualBumpId;

  const updateData = await ManualBump.findOneAndUpdate(
    {
      _id: manualBumpId,
      orderBump: shopUrl,
    },
    req.body,
    {
      new: true,
    }
  );

  res.send(updateData);
  await db.disconnect();
});

export {
  getSingleManualBump,
  createManualBump,
  updateManualBump,
  deleteManualBumpp,
};
