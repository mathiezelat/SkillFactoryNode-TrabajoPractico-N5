import bcrypt from 'bcrypt'

export const encryptPassword = async password => {
	const saltRounds = 10

	const salt = await bcrypt.genSalt(saltRounds)

	const hash = await bcrypt.hash(password, salt)

	return hash
}

export const comparePassword = async (password, userPassword) => {
	const validation = await bcrypt.compare(password, userPassword)

	return validation
}
