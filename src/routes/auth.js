import { Router } from 'express'

import { login, googleSignIn, register } from '../controllers/auth.js'

import { validateJWT } from '../middlewares/validateJWT.js'

const router = Router()

router
	.get('/profile', validateJWT, (req, res) => {
		const user = req.user

		const { google, password, ...userWithoutPassword } = user

		res.status(200).json(userWithoutPassword)
	})
	.post('/login', login)
	.post('/register', register)
	.post('/google', googleSignIn)

export default router
