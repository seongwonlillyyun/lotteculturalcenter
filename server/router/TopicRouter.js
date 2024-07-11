import express from "express";
import * as controller from "../controller/TopicController.js";

const router = express.Router();
router
  .get("/:id", controller.getTopic)
  .post("/:id/course", controller.getCoursesByTopic);

export default router;
