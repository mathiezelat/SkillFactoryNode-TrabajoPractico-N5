import { Router } from 'express'

import {
	getAllUsers,
	getOneUser,
	createOneUser,
	updateOneUser,
	deleteOneUser,
} from '../controllers/users.js'

const router = Router()

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Iron Man
 *         email:
 *           type: string
 *           example: iron.man@mail.com
 *         id:
 *           type: string
 *           example: b052a28f-c96e-463b-bf38-a4e076452fe7
 */

/**
 * @openapi
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: number
 *         description: Specifies the users to skip
 *         example: 0
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: Specifies the users to limit
 *         example: 10
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                   example: 1
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/User"
 *   post:
 *     tags:
 *       - Users
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
 * /api/users/{userId}:
 *   get:
 *     tags:
 *       - Users
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of user that needs to be updated
 *         required: true
 *         schema:
 *           type: string
 *           example: 01ad9b16-e096-4145-be79-b39add9e9d8f
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       404:
 *         description: NOT FOUND
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: User does not exist
 *   put:
 *     tags:
 *       - Users
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of user that needs to be updated
 *         required: true
 *         schema:
 *           type: string
 *           example: 01ad9b16-e096-4145-be79-b39add9e9d8f
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
 *     responses:
 *       200:
 *         description: OK
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
 *       404:
 *         description: NOT FOUND
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: User does not exist
 *   delete:
 *     tags:
 *       - Users
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of user that needs to be updated
 *         required: true
 *         schema:
 *           type: string
 *           example: 01ad9b16-e096-4145-be79-b39add9e9d8f
 *     responses:
 *       200:
 *         description: OK
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
 *       404:
 *         description: NOT FOUND
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: User does not exist
 */
router
	.get('/', getAllUsers)
	.get('/:userId', getOneUser)
	.post('/', createOneUser)
	.put('/:userId', updateOneUser)
	.delete('/:userId', deleteOneUser)

export default router
