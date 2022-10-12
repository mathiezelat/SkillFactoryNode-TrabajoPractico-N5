// llamar a nuestra /mail con fetch()
const accessToken = localStorage.getItem('access_token')

if (!accessToken) {
	window.location = '/'
}

const mailForm = document.getElementById('mail-form')

mailForm.addEventListener('submit', event => {
	event.preventDefault()

	const formData = new FormData(event.target)

	const newMail = {
		from: formData.get('from'),
		to: formData.get('to'),
		subject: formData.get('subject'),
		text: formData.get('text'),
		html: formData.get('html'),
	}

	fetch('/api/mail', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newMail),
	})
		.then(response => {
			console.log(response.statusText)
			event.target.reset()
		})
		.catch(error => {
			console.error(error)
		})
})
