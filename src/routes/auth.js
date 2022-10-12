import { Router } from 'express'

import { login, googleSignIn, register } from '../controllers/auth.js'

import { validateJWT } from '../middlewares/validateJWT.js'

const router = Router()

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @openapi
 * /api/auth/profile:
 *   get:
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       401:
 *         description: UNAUTHORIZED
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: iron.man@mail.com
 *               password:
 *                 type: string
 *                 example: iamironman
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: "#/components/schemas/User"
 *                 token:
 *                   type: string
 *       400:
 *         description: BAD REQUEST
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *       500:
 *         description: FAILED
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Iron Man
 *               email:
 *                 type: string
 *                 example: iron.man@mail.com
 *               password:
 *                 type: string
 *                 example: iamironman
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: CREATED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       400:
 *         description: BAD REQUEST
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *       500:
 *         description: FAILED
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 * /api/auth/google:
 *   post:
 *     tags:
 *       - Auth
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               credential:
 *                 type: string
 *             required:
 *               - credential
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: "#/components/schemas/User"
 *                 token:
 *                   type: string
 *       400:
 *         description: BAD REQUEST
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *       500:
 *         description: FAILED
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
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
