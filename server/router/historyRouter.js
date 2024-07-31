import express from 'express'
import * as controller from '../controller/historyController.js'

const router = express.Router()

router.post('/list', controller.getHistory)
router.post('/cancellist', controller.getCancelHistory)
router.get('/:orderId', controller.getHistoryDetail)
router.post('/cancel', controller.cancelHistory)
router.post('/search', controller.searchHistory)
router.post('/searchcancel', controller.searchCancelHistory)
router.post('/reviewNo', controller.reviewNo)

export default router;