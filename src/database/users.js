import crypto from 'crypto'

import { readFromDatabase, saveToDatabase } from '../utils/database.js'

export const getAllUsers = async () => {
	const database = await readFromDatabase()

	if (!database.hasOwnProperty('users')) {
		database.users = []
	}

	return database.users
}

export const getOneUser = async userId => {
	const database = await readFromDatabase()

	if (!database.hasOwnProperty('users')) {
		database.users = []
	}

	const user = database.users.find(user => user.id === userId)

	return user
}

export const getOneUserByEmail = async email => {
	const database = await readFromDatabase()

	if (!database.hasOwnProperty('users')) {
		database.users = []
	}

	const user = database.users.find(user => user.email === email)

	return user
}

export const createOneUser = async newUser => {
	const database = await readFromDatabase()

	newUser.id = crypto.randomUUID()

	if (!database.hasOwnProperty('users')) {
		database.users = []
	}

	database.users = [...database.users, newUser]

	await saveToDatabase(database)

	return newUser
}

export const updateOneUser = async (userId, change) => {
	const database = await readFromDatabase()

	const user = database.users.find(user => user.id === userId)

	const userIndex = database.users.findIndex(user => user.id === userId)

	const updatedUser = { ...user, ...change }

	database.users.splice(userIndex, 1, updatedUser)

	await saveToDatabase(database)

	return updatedUser
}

export const deleteOneUser = async userId => {
	const database = await readFromDatabase()

	const userIndex = database.users.findIndex(user => user.id === userId)

	const deletedUser = database.users.splice(userIndex, 1)[0]

	await saveToDatabase(database)

	return deletedUser
}
