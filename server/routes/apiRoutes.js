import express from "express";

const apiRouter = express.Router();

apiRouter.route("/").get((req, res) => {
  res.send("api routes");
});

export default apiRouter;
