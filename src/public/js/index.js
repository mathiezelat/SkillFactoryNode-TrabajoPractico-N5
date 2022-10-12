const accessToken = localStorage.getItem('access_token')

if (accessToken) {
	window.location = '/home.html'
}

function handleCredentialResponse(response) {
	const newUrl = new URL(`${window.location.origin}/api/auth/google`)

	const body = { credential: response.credential }

	fetch(newUrl.href, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	})
		.then(response => response.json())
		.then(data => {
			console.log(data)

			localStorage.setItem('access_token', data.token)

			window.location = '/home.html'
		})
		.catch(console.error)
}

document.addEventListener('DOMContentLoaded', () => {
	function openModal($el) {
		$el.classList.add('is-active')
	}

	function closeModal($el) {
		$el.classList.remove('is-active')
	}

	function closeAllModals() {
		;(document.querySelectorAll('.modal') || []).forEach($modal => {
			closeModal($modal)
		})
	}

	;(document.querySelectorAll('.js-modal-trigger') || []).forEach(
		$trigger => {
			const modal = $trigger.dataset.target
			const $target = document.getElementById(modal)

			$trigger.addEventListener('click', () => {
				openModal($target)
			})
		}
	)
	;(
		document.querySelectorAll(
			'.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button'
		) || []
	).forEach($close => {
		const $target = $close.closest('.modal')

		$close.addEventListener('click', () => {
			closeModal($target)
		})
	})

	document.addEventListener('keydown', event => {
		const e = event || window.event

		if (e.keyCode === 27) {
			closeAllModals()
		}
	})
})

const buttonModalCloseLogin = document.getElementById('modal-close-login')
const buttonModalCloseRegister = document.getElementById('modal-close-register')
const loginForm = document.getElementById('login-form')
const registerForm = document.getElementById('register-form')

loginForm.addEventListener('submit', event => {
	event.preventDefault()

	const formData = new FormData(event.target)

	const user = {
		email: formData.get('email'),
		password: formData.get('password'),
	}

	fetch('/api/auth/login', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	})
		.then(response => {
			if (response.status === 400) {
				throw new Error('Error al iniciar sesión')
			}

			return response.json()
		})
		.then(data => {
			localStorage.setItem('access_token', data.token)

			event.target.reset()

			buttonModalCloseLogin.click()

			window.location = '/home.html'
		})
		.catch(error => {
			console.error(error)
		})
})

registerForm.addEventListener('submit', event => {
	event.preventDefault()

	const formData = new FormData(event.target)

	const newUser = {
		name: formData.get('name'),
		email: formData.get('email'),
		password: formData.get('password'),
	}

	fetch('/api/auth/register', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newUser),
	})
		.then(response => {
			if (response.status === 400) {
				throw new Error('Error al registrarse')
			}

			return response.json()
		})
		.then(() => {
			event.target.reset()

			buttonModalCloseRegister.click()
		})
		.catch(error => {
			console.error(error)
		})
})
