import fs from 'fs/promises'

import { fsExists } from '../utils/fs.js'

const filePath = './src/database/db.json'
const filePathHistoryChats = './src/database/history-chats.json'
const filePathLogChats = './src/log/chats.txt'

export const readFromDatabase = async () => {
	const isDatabaseExists = await fsExists(filePath)

	if (isDatabaseExists) {
		const DB = await fs.readFile(filePath, 'utf-8')
		return JSON.parse(DB)
	} else {
		return {}
	}
}

export const saveToDatabase = async data => {
	await fs.writeFile(filePath, JSON.stringify(data, null, 2), {
		encoding: 'utf-8',
	})
}

export const readHistory = async () => {
	const isHistoryChatExists = await fsExists(filePathHistoryChats)

	if (isHistoryChatExists) {
		const historyChats = await fs.readFile(filePathHistoryChats, 'utf-8')
		return JSON.parse(historyChats)
	} else {
		return {}
	}
}

export const saveHistory = async data => [
	await fs.writeFile(filePathHistoryChats, JSON.stringify(data, null, 2), {
		encoding: 'utf-8',
	}),
]

export const saveMessage = async (room, name, message) => {
	const time = new Date().toLocaleString()

	const historyMessage = `Sala: ${room}\n\tNombre de usuario: ${name}\n\t\t${message}\n\t- ${time}\n`

	await fs.appendFile(filePathLogChats, historyMessage)
}
