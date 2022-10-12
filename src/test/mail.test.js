import { expect } from 'chai'
import request from 'supertest'

import server from '../app.js'

const mail = {
	from: 'mail@test.com',
	to: '',
	subject: 'Esto es un test',
	text: 'Esto es un test',
	html: '<h1>Hola Test</h1>',
}

describe('Mail', () => {
	it('Should show all sent mails', async () => {
		const response = await request(server).get('/api/mail')

		expect(response.status).to.equal(200)
		expect(response.body).to.be.a('object')
		expect(response.body.count).to.be.a('number')
		expect(response.body.mails).to.be.a('array')
	})
	it('Should send an email', async () => {
		const response = await request(server).post('/api/mail').send(mail)

		expect(response.status).to.equal(201)
	})
})
