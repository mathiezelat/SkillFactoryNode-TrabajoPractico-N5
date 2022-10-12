import { sendMail } from '../utils/mails.js'
import { readFromDatabase, saveToDatabase } from '../utils/database.js'

export const getAllMails = async () => {
	const database = await readFromDatabase()

	if (!Object.hasOwn(database, 'mails')) {
		database.mails = []
	}

	return database.mails
}

export const createOneMail = async newEmail => {
	const sentMail = await sendMail(newEmail)

	const database = await readFromDatabase()

	if (!Object.hasOwn(database, 'mails')) {
		database.mails = []
	}

	database.mails = [...database.mails, sentMail]

	await saveToDatabase(database)

	return sentMail
}
