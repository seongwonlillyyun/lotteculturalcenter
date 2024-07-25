import express from "express"
import * as controller from "../controller/boardController.js"

const router = express.Router();

router.post("/qna", controller.getQnA)
router.get("/qna/tabs",controller.getQnaTabs);
router.post("/evt_noti/add", controller.setNotiEvent);
router.post("/notievt", controller.getNotiEvtList);
router.get("/notievt/all", controller.getAllNotiEvtList);
router.get("/notievt/:id", controller.getNotiEvt);
router.post("/personal", controller.getPersonalList);
router.get("/personal/no_reply", controller.getNoReplyList);
router.post("/personal/add", controller.setPersonal);
router.get("/personal/delete/:id", controller.removePersonal);
router.post("/personal/update", controller.updatePersonal);
router.get("/personal/:id", controller.getPersonal);
router.post("/myReview", controller.getMyReview);
router.post("/review", controller.getReviewList);
router.post("/review/add", controller.setReview);
router.get("/review/hits", controller.getHitsReview);
router.get("/review/:id", controller.getReview);

export default router;