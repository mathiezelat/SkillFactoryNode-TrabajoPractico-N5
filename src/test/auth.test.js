import { expect } from 'chai'
import request from 'supertest'

import server from '../app.js'

let userId = ''

let token = ''

const user = {
	name: 'Iron Test',
	email: 'iron.test@test.com',
	password: '1234',
}

describe('Auth', () => {
	after(async () => {
		await request(server).delete(`/api/users/${userId}`)
	})

	it('Should be able to register', async () => {
		const response = await request(server)
			.post('/api/auth/register')
			.send(user)

		expect(response.status).to.equal(201)
		expect(response.body).to.be.a('object')
		expect(response.body.name).to.be.a('string')
		expect(response.body.name).to.equal(user.name)
		expect(response.body.email).to.be.a('string')
		expect(response.body.email).to.equal(user.email)
		expect(response.body.id).to.be.a('string')

		userId = response.body.id
	})
	it('Should be able to log in', async () => {
		const response = await request(server)
			.post('/api/auth/login')
			.send({ email: user.email, password: user.password })

		expect(response.status).to.equal(200)
		expect(response.body).to.be.a('object')
		expect(response.body.user).to.be.a('object')
		expect(response.body.user.name).to.be.a('string')
		expect(response.body.user.name).to.equal(user.name)
		expect(response.body.user.email).to.be.a('string')
		expect(response.body.user.email).to.equal(user.email)
		expect(response.body.user.id).to.be.a('string')
		expect(response.body.token).to.be.a('string')

		token = response.body.token
	})

	it('Should be able to view your profile', async () => {
		const response = await request(server)
			.get('/api/auth/profile')
			.auth(token, { type: 'bearer' })

		expect(response.status).to.equal(200)
		expect(response.body).to.be.a('object')
		expect(response.body.name).to.be.a('string')
		expect(response.body.name).to.equal(user.name)
		expect(response.body.email).to.be.a('string')
		expect(response.body.email).to.equal(user.email)
		expect(response.body.id).to.be.a('string')
	})
})
