import authorControler from "./controler.js"
import express from "express"

const authorRouter = new express.Router();
authorRouter.get("/", authorControler.get3);
authorRouter.get("/init", authorControler.init);

export default authorRouter;