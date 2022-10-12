import { Router } from 'express'

import {
	getAllUsers,
	getOneUser,
	createOneUser,
	updateOneUser,
	deleteOneUser,
} from '../controllers/users.js'

const router = Router()

router
	.get('/', getAllUsers)
	.get('/:userId', getOneUser)
	.post('/', createOneUser)
	.put('/:userId', updateOneUser)
	.delete('/:userId', deleteOneUser)

export default router
