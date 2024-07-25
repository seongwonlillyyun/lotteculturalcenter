import express from "express"
import * as controller from "../controller/locationController.js"

const router = express.Router();

router.post("/", controller.getLocation);
router.post("/add", controller.setLocation)
router.post("/favorite", controller.getFavoriteLocation);
router.get("/:id", controller.getLocationSlide);


export default router;