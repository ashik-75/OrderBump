import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import AutoBump from "../models/AutoBump.js";

const addAutoBump = expressAsyncHandler(async (req, res) => {
  const db = await mongoose.connect(process.env.MONGO_URI);
  const autoBump = await AutoBump.create(req.body);
  res.send(autoBump);
  await db.disconnect();
});

const updateAutoBump = expressAsyncHandler(async (req, res) => {
  const db = await mongoose.connect(process.env.MONGO_URI);
  const autoBumpId = req.params.autoBumpId;

  const updateBump = await AutoBump.findByIdAndUpdate(autoBumpId, req.body, {
    new: true,
  });
  res.send(updateBump);
  await db.disconnect();
});

const getAutoBump = expressAsyncHandler(async (req, res) => {
  const db = await mongoose.connect(process.env.MONGO_URI);
  const autoBumpId = req.params.autoBumpId;
  const autoBump = await AutoBump.findById(autoBumpId);
  console.log({ autoBumpId, autoBump });
  res.send(autoBump);
  await db.disconnect();
});

export { addAutoBump, updateAutoBump, getAutoBump };
