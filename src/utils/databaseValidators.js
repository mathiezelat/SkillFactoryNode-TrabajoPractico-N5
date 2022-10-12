import * as users from '../database/users.js'

export const userExistsByEmail = async email => {
	const existsUser = users.getOneUserByEmail(email)

	return existsUser
}

export const userExistsById = async id => {
	const existsUser = users.getOneUser(id)

	return existsUser
}
