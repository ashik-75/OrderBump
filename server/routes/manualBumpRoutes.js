import express from "express";
import {
  createManualBump,
  deleteManualBumpp,
  getSingleManualBump,
  updateManualBump,
} from "../controllers/manualBumpController.js";

const manualBumpRouter = express.Router();

manualBumpRouter.post("/create", createManualBump);

manualBumpRouter.get("/:manualBumpId", getSingleManualBump);
manualBumpRouter.put("/:manualBumpId/update", updateManualBump);
manualBumpRouter.delete("/:manualBumpId/delete", deleteManualBumpp);

export default manualBumpRouter;
