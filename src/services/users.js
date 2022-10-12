import * as users from '../database/users.js'

export const getAllUsers = async () => {
	const allUsers = await users.getAllUsers()

	const allUsersExcludeFields = allUsers.map(oneUser => {
		const { google, password, ...allUserExcludeFields } = oneUser
		return allUserExcludeFields
	})

	return allUsersExcludeFields
}

export const getOneUser = async userId => {
	const oneUser = await users.getOneUser(userId)

	if (!oneUser) {
		return
	}

	const { google, password, ...oneUserExcludeFields } = oneUser

	return oneUserExcludeFields
}

export const createOneUser = async newUser => {
	const createdOneUser = await users.createOneUser(newUser)

	const { google, password, ...createdUserExcludeFields } = createdOneUser

	return createdUserExcludeFields
}

export const updateOneUser = async (userId, change) => {
	const updatedUser = await users.updateOneUser(userId, change)

	const { google, password, ...updatedUserExcludeFields } = updatedUser

	return updatedUserExcludeFields
}

export const deleteOneUser = async userId => {
	const deletedUser = await users.deleteOneUser(userId)

	const { google, password, ...deletedUserExcludeFields } = deletedUser

	return deletedUserExcludeFields
}
