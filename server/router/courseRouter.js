import express from "express"
import * as controller from "../controller/courseController.js"

const router = express.Router();

router.post("/", controller.getCategoryCourse)
router.post("/add", controller.setCourse)
router.get("/best", controller.getBestCourse);
router.post("/new", controller.getNewCourse);
router.get("/:id", controller.getCourse)

export default router;