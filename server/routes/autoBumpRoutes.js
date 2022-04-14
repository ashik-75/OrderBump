import express from "express";
import {
  addAutoBump,
  getAutoBump,
  updateAutoBump,
} from "../controllers/autoBumpController.js";

const autoBumpRouter = express.Router();

autoBumpRouter.get("/:autoBumpId", getAutoBump);
autoBumpRouter.post("/add", addAutoBump);
autoBumpRouter.put("/update/:autoBumpId", updateAutoBump);

export default autoBumpRouter;
