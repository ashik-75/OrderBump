import express from "express";
import {
  addAutoBump,
  updateAutoBump,
  updateAutoBumpClick,
  updateAutoBumpViews,
} from "../controllers/autoBumpController.js";

const autoBumpRouter = express.Router();

autoBumpRouter.post("/create", addAutoBump);
autoBumpRouter.put("/:autoBumpId/update", updateAutoBump);
autoBumpRouter.get("/:autoBumpId/views", updateAutoBumpViews);
autoBumpRouter.get("/:autoBumpId/click", updateAutoBumpClick);

export default autoBumpRouter;
