import express from "express"
import * as controller from "../controller/courseController.js"

const router = express.Router();

router.post("/", controller.getCategoryCourse)
router.get("/:id", controller.getCourse)
router.post("/add", controller.setCourse)

export default router;