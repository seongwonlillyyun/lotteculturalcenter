import express from "express"
import * as controller from "../controller/boardController.js"

const router = express.Router();

router.post("/qna", controller.getQnA)
router.get("/qna/tabs",controller.getQnaTabs);
router.post("/evt_noti/add", controller.setNotiEvent);

export default router;