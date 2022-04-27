import express from "express";
import {
  createManualBump,
  deleteManualBumpp,
  getAllManualBump,
  getSingleManualBump,
  updateClick,
  updateManualBump,
  updateViews,
} from "../controllers/manualBumpController.js";

const manualBumpRouter = express.Router();

manualBumpRouter.get("/", getAllManualBump);
manualBumpRouter.post("/create", createManualBump);
manualBumpRouter.get("/:manualBumpId/views", updateViews);
manualBumpRouter.get("/:manualBumpId/click", updateClick);
manualBumpRouter.get("/:manualBumpId", getSingleManualBump);
manualBumpRouter.put("/:manualBumpId/update", updateManualBump);
manualBumpRouter.delete("/:manualBumpId/delete", deleteManualBumpp);

export default manualBumpRouter;
