import express from "express";
import {
  createBump,
  deleteBumpp,
  getAllBumps,
  getSingleBump,
  updateBumpp,
} from "../controllers/bumpController.js";

const bumpRouter = express.Router();

bumpRouter.get("/", getAllBumps);
bumpRouter.get("/:bumpId", getSingleBump);
bumpRouter.delete("/delete/:bumpId", deleteBumpp);
bumpRouter.put("/update/:bumpId", updateBumpp);
bumpRouter.post("/create", createBump);

export default bumpRouter;
