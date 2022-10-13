import express from 'express'
import {
  accessChat,
  addToGroup,
  createGroupChat,
  fetchChats,
  removeFromGroup,
  renameGroup,
} from '../controllers/chatController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.route('/').post(auth, accessChat).get(auth, fetchChats)

router.route('/group').post(auth, createGroupChat).put(auth, renameGroup)

router.put('/group/add', auth, addToGroup)

router.put('/group/remove', auth, removeFromGroup)

export default router
