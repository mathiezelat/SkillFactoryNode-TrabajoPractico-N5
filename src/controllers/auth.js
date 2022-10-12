import * as users from '../database/users.js'
import { generateJWT } from '../utils/generateJWT.js'
import { googleVerify } from '../utils/googleVerify.js'
import { comparePassword, encryptPassword } from '../utils/hash.js'
import { userExistsByEmail } from '../utils/databaseValidators.js'
import { regexEmail } from '../utils/regex.js'

export const login = async (req, res) => {
	const { email, password } = req.body

	try {
		const user = await users.getOneUserByEmail(email)
		if (!user) {
			return res.status(400).send('User does not exist')
		}

		const isValidPassword = await comparePassword(password, user.password)
		if (!isValidPassword) {
			return res.status(400).send('User password invalid')
		}

		const generatedToken = await generateJWT({ id: user.id })

		const { google, password: pwd, ...userWithoutPassword } = user

		res.status(200).json({
			user: userWithoutPassword,
			token: generatedToken,
		})
	} catch (error) {
		console.log(error)
		res.status(500).send('Internal Server Error')
	}
}

export const register = async (req, res) => {
	const { name, email, password } = req.body

	if (!name || !email || !password) {
		return res.status(400).send('Missing name, email and password fields')
	}

	if (!email.match(regexEmail)) {
		return res.status(400).send('Invalid email')
	}

	try {
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

		const {
			google,
			password: pwd,
			...createdUserWithoutPassword
		} = createdUser

		res.status(201).json(createdUserWithoutPassword)
	} catch (error) {
		console.log(error)
		res.status(500).send('Internal Server Error')
	}
}

export const googleSignIn = async (req, res) => {
	const { credential } = req.body

	try {
		const { name, email, picture } = await googleVerify(credential)

		let user = await users.getOneUserByEmail(email)

		if (!user) {
			const newUser = {
				name,
				email,
				picture,
				password: 'hyp3r$3cr37P4$$w0rd!',
				google: true,
			}

			user = await users.createOneUser(newUser)
		}

		const generatedToken = await generateJWT({ id: user.id })

		const { google, password: pwd, ...userWithoutPassword } = user

		res.status(200).json({
			user: userWithoutPassword,
			token: generatedToken,
		})
	} catch (error) {
		console.log(error)
		res.status(500).send('Internal Server Error')
	}
}
