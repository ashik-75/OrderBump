import express from "express";
import { createProduct } from "../controllers/webhookController.js";

const webhookRoutes = express.Router();

webhookRoutes.route("/create-product").post(createProduct);

export default webhookRoutes;
