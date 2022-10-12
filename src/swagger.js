import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Skill Factory Node - Trabajo Práctico 5 - Chat',
			version: '1.0.0',
		},
	},
	apis: ['src/routes/auth.js', 'src/routes/mail.js', 'src/routes/users.js'],
}

const swaggerSpec = swaggerJSDoc(options)

export const swaggerDocs = app => {
	app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

	app.get('/api/docs.json', (req, res) => {
		res.status(200).json(swaggerSpec)
	})
}
