import { OAuth2Client } from 'google-auth-library'

import { GOOGLE_CLIENT_ID } from '../config.js'

const client = new OAuth2Client(GOOGLE_CLIENT_ID)

export const googleVerify = async token => {
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: GOOGLE_CLIENT_ID,
	})

	const { name, email, picture } = ticket.getPayload()

	return {
		name,
		email,
		picture,
	}
}
