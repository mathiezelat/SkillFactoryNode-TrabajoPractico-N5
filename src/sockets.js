import {
	userJoin,
	getRooms,
	getRoomUsers,
	getCurrentUser,
	userLeave,
	formatMessage,
} from './utils/socketsUsers.js'

import { readHistory, saveHistory, saveMessage } from './utils/database.js'

const botName = 'TP5 Bot'

export default io => {
	io.on('connection', async socket => {
		// console.log('Nuevo usuario', socket.id)

		const rooms = getRooms()

		io.emit('get:rooms', { rooms })

		socket.on('connect:room', async ({ user, room }) => {
			userJoin(user, socket.id, room)

			socket.join(room)

			const history = await readHistory()

			if (!history.hasOwnProperty(room)) {
				history[room] = []
			}

			socket.emit('room:get-messages', history[room])

			socket.emit(
				'room:message',
				formatMessage(botName, `¡Bienvenido a la sala ${room}!`)
			)

			socket.broadcast
				.to(room)
				.emit(
					'room:message',
					formatMessage(botName, `${user.name} se ha unido a la sala`)
				)

			io.to(room).emit('room:users', {
				room,
				users: getRoomUsers(room),
			})

			const rooms = getRooms()

			io.emit('get:rooms', { rooms })
		})

		socket.on('room:send-message', async message => {
			const user = getCurrentUser(socket.id)

			const formatedMessage = formatMessage(user.name, message)

			const history = await readHistory()

			if (!history.hasOwnProperty(user.room)) {
				history[user.room] = []
			}

			history[user.room].push(formatedMessage)

			await saveHistory(history)
			await saveMessage(user.room, user.name, message)

			io.to(user.room).emit('room:message', formatedMessage)
		})

		socket.on('disconnect', () => {
			const user = userLeave(socket.id)

			if (user) {
				io.to(user.room).emit(
					'room:message',
					formatMessage(botName, `${user.name} se ha ido de la sala`)
				)

				io.to(user.room).emit('room:users', {
					room: user.room,
					users: getRoomUsers(user.room),
				})
			}
		})
	})
}
