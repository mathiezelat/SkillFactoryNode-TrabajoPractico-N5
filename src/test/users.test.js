import { expect } from 'chai'
import request from 'supertest'

import server from '../app.js'

let userId = ''

const user = {
	name: 'Iron Man',
	email: 'iron.man@test.com',
	password: '12345678',
}

const changeUser = {
	name: 'I Am Iron Man',
	email: 'i.am.iron.man@test.com',
}

describe('Users', () => {
	it('Should get all users', async () => {
		const response = await request(server).get('/api/users')

		expect(response.status).to.equal(200)
		expect(response.body).to.be.a('object')
		expect(response.body.count).to.be.a('number')
		expect(response.body.users).to.be.a('array')
	})
	it('Should create one user', async () => {
		const response = await request(server).post('/api/users').send(user)

		expect(response.status).to.equal(201)
		expect(response.body).to.be.a('object')
		expect(response.body.name).to.be.a('string')
		expect(response.body.name).to.equal(user.name)
		expect(response.body.email).to.be.a('string')
		expect(response.body.email).to.equal(user.email)
		expect(response.body.id).to.be.a('string')

		userId = response.body.id
	})
	it('Should get one user', async () => {
		const response = await request(server).get(`/api/users/${userId}`)

		expect(response.status).to.equal(200)
		expect(response.body).to.be.a('object')
		expect(response.body.name).to.be.a('string')
		expect(response.body.name).to.equal(user.name)
		expect(response.body.email).to.be.a('string')
		expect(response.body.email).to.equal(user.email)
		expect(response.body.id).to.be.a('string')
	})
	it('Should update one user', async () => {
		const response = await request(server)
			.put(`/api/users/${userId}`)
			.send(changeUser)

		expect(response.status).to.equal(200)
		expect(response.body).to.be.a('object')
		expect(response.body.name).to.be.a('string')
		expect(response.body.name).to.equal(changeUser.name)
		expect(response.body.email).to.be.a('string')
		expect(response.body.email).to.equal(changeUser.email)
		expect(response.body.id).to.be.a('string')
	})
	it('Should delete one user', async () => {
		const response = await request(server).delete(`/api/users/${userId}`)

		expect(response.status).to.equal(200)
		expect(response.body).to.be.a('object')
		expect(response.body.name).to.be.a('string')
		expect(response.body.name).to.equal(changeUser.name)
		expect(response.body.email).to.be.a('string')
		expect(response.body.email).to.equal(changeUser.email)
		expect(response.body.id).to.be.a('string')
	})
})
