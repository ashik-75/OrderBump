import express from "express";
import { getOrderBumpInfo } from "../controllers/fetchDataController.js";

const fetchDataRouter = express.Router();

fetchDataRouter.route("/orderbump/getbumpconfig").get(getOrderBumpInfo);

export default fetchDataRouter;
