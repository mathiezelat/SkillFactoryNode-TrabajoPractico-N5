import * as mail from '../database/mail.js'

export const getAllMails = async () => {
	const allMails = await mail.getAllMails()
	return allMails
}

export const createOneMail = async newMail => {
	const createdOneMail = await mail.createOneMail(newMail)
	return createdOneMail
}
