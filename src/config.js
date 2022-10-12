import dotenv from 'dotenv'

dotenv.config()

export const {
	PORT,
	SECRET_OR_PRIVATE_KEY,
	GMAIL_USER,
	GMAIL_PASSWORD,
	GOOGLE_CLIENT_ID,
} = process.env
