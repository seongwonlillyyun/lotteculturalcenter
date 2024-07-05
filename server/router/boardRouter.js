import express from "express"
import * as controller from "../controller/boardController.js"

const router = express.Router();

router.post("/qna", controller.getQnA)

export default router;