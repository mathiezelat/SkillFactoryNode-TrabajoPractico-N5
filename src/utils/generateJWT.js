import jwt from 'jsonwebtoken'

import { SECRET_OR_PRIVATE_KEY } from '../config.js'

export const generateJWT = payload => {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, SECRET_OR_PRIVATE_KEY, (error, token) => {
			if (error) {
				console.log(error)
				reject('An error occurred when generating a token with jwt')
			} else {
				resolve(token)
			}
		})
	})
}
