import * as users from '../services/users.js'

import {
	userExistsByEmail,
	userExistsById,
} from '../utils/databaseValidators.js'
import { encryptPassword } from '../utils/hash.js'
import { regexEmail } from '../utils/regex.js'

export const getAllUsers = async (req, res) => {
	const { skip = 0, limit = 5 } = req.query

	const allUsers = await users.getAllUsers()

	res.status(200).json({
		count: allUsers.length,
		users: allUsers.slice(Number(skip), Number(limit)),
	})
}

export const getOneUser = async (req, res) => {
	const { userId } = req.params

	const isUserExists = await userExistsById(userId)

	if (!isUserExists) {
		return res.status(404).send('User does not exist')
	}

	const user = await users.getOneUser(userId)

	res.status(200).json(user)
}

export const createOneUser = async (req, res) => {
	const { name, email, password } = req.body

	if (!name || !email || !password) {
		return res.status(400).send('Missing name, email and password fields')
	}

	if (!email.match(regexEmail)) {
		return res.status(400).send('Invalid email')
	}

	const isUserExists = await userExistsByEmail(email)

	if (isUserExists) {
		return res.status(400).send('User already exists')
	}

	const encryptedPassword = await encryptPassword(password)

	const newUser = {
		name,
		email,
		password: encryptedPassword,
		google: false,
	}

	const createdUser = await users.createOneUser(newUser)

	res.status(201).json(createdUser)
}

export const updateOneUser = async (req, res) => {
	const { userId } = req.params
	const { name, email, password } = req.body

	const isUserExists = await userExistsById(userId)

	if (!isUserExists) {
		return res.status(404).send('User does not exist')
	}

	const changeUser = {}

	if (name) {
		changeUser.name = name
	}

	if (email) {
		if (!email.match(regexEmail)) {
			return res.status(400).send('Invalid email')
		}

		const isUserExists = await userExistsByEmail(email)

		if (isUserExists) {
			return res.status(400).send('User already exists')
		}

		changeUser.email = email
	}

	if (password) {
		const encryptedPassword = await encryptPassword(password)

		changeUser.password = encryptedPassword
	}

	const updatedUser = await users.updateOneUser(userId, changeUser)

	res.status(200).json(updatedUser)
}

export const deleteOneUser = async (req, res) => {
	const { userId } = req.params

	const isUserExists = await userExistsById(userId)

	if (!isUserExists) {
		return res.status(404).send('User does not exist')
	}

	const deletedUser = await users.deleteOneUser(userId)

	res.status(200).json(deletedUser)
}
