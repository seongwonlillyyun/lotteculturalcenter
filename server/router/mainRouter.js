import express from "express"
import * as controller from "../controller/mainController.js"

const router = express.Router();

router.post("/slide/add", controller.setMainSlide);
router.get("/slide", controller.getMainSlide);

export default router;