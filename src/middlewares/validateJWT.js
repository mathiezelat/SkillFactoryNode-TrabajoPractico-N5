import jwt from 'jsonwebtoken'

import * as users from '../database/users.js'

import { SECRET_OR_PRIVATE_KEY } from '../config.js'

export const validateJWT = async (req, res, next) => {
	const authorization = req.headers.authorization

	if (!authorization) {
		return res.status(401).send('No authorization in the request')
	}

	if (!authorization.startsWith('Bearer ')) {
		return res.status(401).send('No bearer token in the request')
	}

	const token = authorization.slice(7, authorization.length)

	if (!token) {
		return res.status(401).send('No token in the request')
	}

	try {
		const { id } = jwt.verify(token, SECRET_OR_PRIVATE_KEY)

		const user = await users.getOneUser(id)

		if (!user) {
			return res.status(401).send('User does not exist in the database')
		}

		req.user = user

		next()
	} catch (error) {
		console.log(error)
		res.status(401).send('Token invalid')
	}
}
