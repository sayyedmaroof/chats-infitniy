import express from 'express'
import { allMessages, sendMessage } from '../controllers/messageController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.route('/').post(auth, sendMessage)

router.route('/:chatId').get(auth, allMessages)

export default router
