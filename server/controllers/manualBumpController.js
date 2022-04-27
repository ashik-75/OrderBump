import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import connectDB from "../Database/connectDb.js";
import returnSessionData from "../index.js";
import ManualBump from "../models/ManualBump.js";
import OrderBump from "../models/OrderBump.js";

// * create Bump Related to merchant (Test Done)
const createManualBump = expressAsyncHandler(async (req, res) => {
  const readyState = mongoose.connection.readyState;

  if (!readyState) connectDB();

  const { shop } = await returnSessionData(req, res);

  const manualBump = await ManualBump.create({
    ...req.body,
    orderBump: shop,
  });

  await OrderBump.findOneAndUpdate(
    {
      shop,
    },
    {
      $push: {
        manualBumps: manualBump._id,
      },
    }
  );

  res.send(manualBump);
});

// TODO: Get Single Bump (test done)
const getSingleManualBump = expressAsyncHandler(async (req, res) => {
  const readyState = mongoose.connection.readyState;

  if (!readyState) connectDB();

  const { shop } = await returnSessionData(req, res);

  const manualBumpId = req.params.manualBumpId;

  const singleBump = await ManualBump.findOne({
    _id: manualBumpId,
    orderBump: shop,
  });

  if (singleBump) {
    res.send(singleBump);
  } else {
    res.status(404);
    throw new Error("Manual Bumps Not Found");
  }
});

// TODO: Get All Bump (test done)
const getAllManualBump = expressAsyncHandler(async (req, res) => {
  const readyState = mongoose.connection.readyState;

  if (!readyState) connectDB();

  const { shop } = await returnSessionData(req, res);

  const getAllBump = await ManualBump.find({
    orderBump: shop,
  });

  if (getAllBump) {
    res.send(getAllBump);
  } else {
    res.status(404);
    throw new Error("Manual Bumps Not Found");
  }
});

// ! Delete Bump Related to Merchant (test done)
const deleteManualBumpp = expressAsyncHandler(async (req, res) => {
  const readyState = mongoose.connection.readyState;

  if (!readyState) connectDB();

  const { shop } = await returnSessionData(req, res);
  const manualBumpId = req.params.manualBumpId;

  await ManualBump.findOneAndDelete({
    _id: manualBumpId,
    orderBump: shop,
  });
  await OrderBump.findOneAndUpdate(
    {
      shop,
    },
    {
      $pull: {
        manualBumps: manualBumpId,
      },
    }
  );
  res.send("Successfull");
});

// ? Update Manual Bump Related to OrderBump (test done)
const updateManualBump = expressAsyncHandler(async (req, res) => {
  const readyState = mongoose.connection.readyState;

  if (!readyState) connectDB();

  const { shop } = await returnSessionData(req, res);

  const manualBumpId = req.params?.manualBumpId;

  const updateData = await ManualBump.findOneAndUpdate(
    {
      _id: manualBumpId,
      orderBump: shop,
    },
    req.body,
    {
      new: true,
    }
  );

  res.send(updateData);
});

// ? Update View in manual Bump

const updateViews = expressAsyncHandler(async (req, res) => {
  const readyState = mongoose.connection.readyState;

  if (!readyState) connectDB();

  const { shop } = await returnSessionData(req, res);

  const manualBumpId = req.params?.manualBumpId;

  const updateData = await ManualBump.findOneAndUpdate(
    {
      _id: manualBumpId,
      orderBump: shop,
    },
    {
      $inc: { views: 1 },
    },
    {
      new: true,
    }
  );

  res.send(updateData);
});

// ? Update click in manual Bump

const updateClick = expressAsyncHandler(async (req, res) => {
  const readyState = mongoose.connection.readyState;

  if (!readyState) connectDB();

  const { shop } = await returnSessionData(req, res);

  const manualBumpId = req.params?.manualBumpId;

  const updateData = await ManualBump.findOneAndUpdate(
    {
      _id: manualBumpId,
      orderBump: shop,
    },
    {
      $inc: { click: 1 },
    },
    {
      new: true,
    }
  );

  res.send(updateData);
});

export {
  getAllManualBump,
  getSingleManualBump,
  createManualBump,
  updateManualBump,
  deleteManualBumpp,
  updateViews,
  updateClick,
};
