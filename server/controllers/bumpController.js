import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Bump from "../models/Bump.js";

const getAllBumps = expressAsyncHandler(async (req, res) => {
  const db = await mongoose.connect(process.env.MONGO_URI);
  const allBumps = await Bump.find().sort("-createdAt");
  res.send(allBumps);
  await db.disconnect();
});

const createBump = expressAsyncHandler(async (req, res) => {
  const db = await mongoose.connect(process.env.MONGO_URI);
  const bump = await Bump.create(req.body);
  res.send(bump);
  await db.disconnect();
});

const deleteBumpp = expressAsyncHandler(async (req, res) => {
  const db = await mongoose.connect(process.env.MONGO_URI);
  await Bump.findByIdAndDelete(req.params.bumpId);
  res.send("Successfull");
  await db.disconnect();
});

const updateBumpp = expressAsyncHandler(async (req, res) => {
  const db = await mongoose.connect(process.env.MONGO_URI);
  const product = await Bump.findByIdAndUpdate(req?.params?.bumpId, req.body, {
    new: true,
  });
  res.send(product);
  await db.disconnect();
});

const getSingleBump = expressAsyncHandler(async (req, res) => {
  const db = await mongoose.connect(process.env.MONGO_URI);
  const singleBump = await Bump.findById(req.params.bumpId);
  if (singleBump) {
    res.send(singleBump);
  } else {
    res.status(404);
    throw new Error("Bumps Not Found");
  }
  await db.disconnect();
});

export { getAllBumps, createBump, getSingleBump, deleteBumpp, updateBumpp };
