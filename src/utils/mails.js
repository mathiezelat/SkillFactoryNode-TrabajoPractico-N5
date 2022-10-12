import nodemailer from 'nodemailer'

import { GMAIL_USER, GMAIL_PASSWORD } from '../config.js'

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: GMAIL_USER,
		pass: GMAIL_PASSWORD,
	},
})

export const sendMail = async mail => {
	const sentMail = await transporter.sendMail(mail)

	console.log(`Message sent: ${sentMail.messageId}`)

	console.log(`Preview URL: ${nodemailer.getTestMessageUrl(sentMail)}`)

	return sentMail
}
