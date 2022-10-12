const viewProfile = document.getElementById('view-profile')

const accessToken = localStorage.getItem('access_token')

const bearerToken = `Bearer ${accessToken}`

if (!accessToken) {
	window.location = '/'
}

const renderProfile = user => {
	const body = `
        <h1>¡Bienvenido ${user.name}!<h1>
    `

	viewProfile.innerHTML = body
}

if (accessToken) {
	fetch('/api/auth/profile', {
		headers: {
			Authorization: bearerToken,
		},
	})
		.then(response => response.json())
		.then(data => {
			renderProfile(data)
		})
		.catch(error => console.error(error))
}

const logout = () => {
	localStorage.removeItem('access_token')
	window.location = '/'
}
