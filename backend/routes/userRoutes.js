import express from 'express'
import { allUsers, login, registerUser } from '../controllers/userController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/register', registerUser)

router.post('/login', login)

router.get('/', auth, allUsers)

export default router
