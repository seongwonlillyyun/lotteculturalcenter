import express from 'express'
import * as controller from '../controller/historyController.js'

const router = express.Router()

router.post('/list', controller.getHistory)

export default router;