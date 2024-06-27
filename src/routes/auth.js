import express from 'express';
import * as authContoller from '../controllers/auth'

const router = express.Router();

router.post('/register',authContoller.register)
router.post('/login',authContoller.login)

export default router