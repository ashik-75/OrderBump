import express from "express";
import {
  addLocationToOrderBump,
  getAllOrderBump,
  getSingleOrderBump,
} from "../controllers/orderBumpController.js";

const orderBumpRouter = express.Router();

orderBumpRouter.route("/all").get(getAllOrderBump);
orderBumpRouter.route("/").get(getSingleOrderBump);
orderBumpRouter.route("/addLocation").put(addLocationToOrderBump);

export default orderBumpRouter;
