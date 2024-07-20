import express from 'express'
import * as controller from '../controller/memberController.js'

const router = express.Router()

router.post('/login', controller.getLogin)
router.post('/idCheck', controller.getIdCheck)
router.post('/join', controller.getJoin)

export default router;