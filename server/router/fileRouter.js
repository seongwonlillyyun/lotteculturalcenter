import express from "express";
import * as controller from "../controller/fileController.js"

const router = express.Router();

router.post("/:id", controller.uploadFile);

export default router;