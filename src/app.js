import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import * as url from 'url'
import sockets from './sockets.js'

import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import mailRoute from './routes/mail.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

app.use(cors())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/mail', mailRoute)

app.use('*', (req, res) => {
	res.redirect('/')
})

sockets(io)

export default httpServer
