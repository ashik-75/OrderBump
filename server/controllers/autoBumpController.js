import expressAsyncHandler from "express-async-handler";
import connectDB from "../Database/connectDb.js";
import AutoBump from "../models/AutoBump.js";
connectDB();
const addAutoBump = expressAsyncHandler(async (req, res) => {
  const autoBump = await AutoBump.create(req.body);
  res.send(autoBump);
});

const updateAutoBump = expressAsyncHandler(async (req, res) => {
  const autoBumpId = req.params.autoBumpId;
  console.log({ autoBumpId });

  const updateBump = await AutoBump.findByIdAndUpdate(autoBumpId, req.body, {
    new: true,
  });
  res.send(updateBump);
});

const getAutoBump = expressAsyncHandler(async (req, res) => {
  const autoBumpId = req.params.autoBumpId;
  const autoBump = await AutoBump.findById(autoBumpId);
  res.send(autoBump);
});

export { addAutoBump, updateAutoBump, getAutoBump };
