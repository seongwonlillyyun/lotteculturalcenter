import express from 'express'
import * as controller from '../controller/memberController.js'

const router = express.Router()

router.post('/login', controller.getLogin)
router.post('/idCheck', controller.getIdCheck)
router.post('/join', controller.getJoin)
router.post('/mypage', controller.memberInfoCheck)
router.post('/branch', controller.branchCheck)
router.post('/branchupdate', controller.branchUpdate)
router.post('/memberinfoupdate', controller.memberInfoUpdate)




export default router;