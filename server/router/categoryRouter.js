import express from "express"
import * as controller from "../controller/categoryController.js"

const router = express.Router();

router.get("/", controller.getCategory);
router.get("/theme", controller.getCategoryTheme)
router.post("/add", controller.setCategory);

export default router;