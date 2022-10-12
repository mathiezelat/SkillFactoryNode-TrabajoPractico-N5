import { Router } from 'express'
import { createOneMail, getAllMails } from './../controllers/mail.js'

const router = Router()

router.get('/', getAllMails).post('/', createOneMail)

export default router
