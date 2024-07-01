import express from "express"
import * as controller from "../controller/locationController.js"

const router = express.Router();

router.post("/add", controller.setLocation)

export default router;