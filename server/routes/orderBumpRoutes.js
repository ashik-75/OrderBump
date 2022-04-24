import express from "express";
import {
  addLocationToOrderBump,
  getSingleOrderBump,
} from "../controllers/orderBumpController.js";

const orderBumpRouter = express.Router();

orderBumpRouter.route("/").get(getSingleOrderBump);
orderBumpRouter.route("/addLocation").put(addLocationToOrderBump);

export default orderBumpRouter;
