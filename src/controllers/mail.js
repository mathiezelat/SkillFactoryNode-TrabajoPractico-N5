import * as mail from '../services/mail.js'

export const getAllMails = async (req, res) => {
	const mails = await mail.getAllMails()

	res.status(200).json({
		count: mails.length,
		mails,
	})
}

export const createOneMail = async (req, res) => {
	const { from, to, subject, text, html } = req.body

	if (!from || !to || !subject || !text || !html) {
		return res
			.status(400)
			.send('Missing from, to, subject, text and html fields')
	}

	const newMail = {
		from,
		to,
		subject,
		text,
		html,
	}

	await mail.createOneMail(newMail)

	res.status(201).send('Email sent successfully')
}
