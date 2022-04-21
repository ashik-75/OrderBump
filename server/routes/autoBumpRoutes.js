import express from "express";
import {
  addAutoBump,
  updateAutoBump,
} from "../controllers/autoBumpController.js";

const autoBumpRouter = express.Router();

autoBumpRouter.post("/create", addAutoBump);
autoBumpRouter.put("/:autoBumpId/update", updateAutoBump);

export default autoBumpRouter;
