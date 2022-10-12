const socket = io.connect()

const $ = id => document.getElementById(id)

const $home = $('chat-home')
const $form = $('chat-form')
const $rooms = $('chat-rooms')
const $room = $('chat-room')
const $messages = $('chat-message')
const $formMessage = $('message-form')
const $chatTitle = $('chat-title')
const $chatSubtitle = $('chat-subtitle')
const $chatLeave = $('chat-leave')

const accessToken = localStorage.getItem('access_token')

if (!accessToken) {
	window.location = '/'
}

const bearerToken = `Bearer ${accessToken}`

let user

if (accessToken) {
	fetch('/api/auth/profile', {
		headers: {
			Authorization: bearerToken,
		},
	})
		.then(response => response.json())
		.then(data => {
			user = data
		})
		.catch(error => console.error(error))
}

const renderRooms = rooms => {
	let body = '<p class="title">Salas activas</p>'

	if (!rooms.length) {
		body += '<p class="subtitle">No hay salas disponibles</p>'
	}

	rooms.forEach(room => {
		body += `<div class="mb-2 is-w-full is-flex is-justify-content-center is-align-items-between" id="chat-${room}">
                <p class="mr-2">${room}</p>
                <button class="button is-primary is-small" onclick="connectChatRoom('${room}')">
                    Conectarse a la sala
                </button>
            </div>`
	})

	$rooms.innerHTML = body
}

const connectRoom = (user, room) => {
	$chatSubtitle.classList.remove('is-hidden')
	$chatTitle.classList.remove('is-hidden')
	$chatLeave.classList.remove('is-hidden')
	$messages.classList.remove('is-hidden')
	$formMessage.classList.remove('is-hidden')
	$room.classList.remove('is-hidden')
	$home.classList.add('is-hidden')

	$chatSubtitle.innerText = `${user.name}`

	socket.emit('connect:room', { user, room })
}

const connectChatRoom = room => {
	connectRoom(user, room)
}

$form.addEventListener('submit', event => {
	event.preventDefault()

	const formData = new FormData(event.target)

	const room = formData.get('room')

	if (room.trim() !== '') {
		connectRoom(user, room)
	}
})

socket.on('get:rooms', ({ rooms }) => {
	renderRooms(rooms)
})

const renderRoom = (room, users) => {
	let body = `<h1 class="title">Sala ${room}</h1>`
	body += `<h2 class="subtitle">Usuarios conectados</h2>`

	body += '<div>'

	users.forEach(user => {
		body += `
            <p>${user.name} (${user.email})</p>
        `
	})

	body += '</div>'

	$room.innerHTML = body
}

socket.on('room:users', ({ room, users }) => {
	renderRoom(room, users)
})

const renderMessage = ({ name, text, time }) => {
	$messages.innerHTML += `<p>
        <span class="has-text-weight-light">${time} </span><span class="has-text-weight-semibold">${name}</span>: ${text}
    </p>`
	$messages.scrollTop = $messages.scrollHeight
}

const renderMessages = messages => {
	messages.forEach(message => {
		renderMessage(message)
	})
}
socket.on('room:get-messages', messages => {
	renderMessages(messages)
})

socket.on('room:message', message => {
	renderMessage(message)
})

$formMessage.addEventListener('submit', event => {
	event.preventDefault()

	const formData = new FormData(event.target)

	const message = formData.get('message')

	socket.emit('room:send-message', message)

	event.target.reset()
})

$chatLeave.addEventListener('click', () => {
	window.location.reload()
})
