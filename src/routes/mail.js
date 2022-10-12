import { Router } from 'express'
import { createOneMail, getAllMails } from './../controllers/mail.js'

const router = Router()

/**
 * @openapi
 * components:
 *   schemas:
 *     Mail:
 *       type: object
 *       properties:
 *         accepted:
 *           type: array
 *           items:
 *             type: string
 *         rejected:
 *           type: array
 *           items:
 *             type: string
 *         envelopeTime:
 *           type: number
 *         messageTime:
 *           type: number
 *         messageSize:
 *           type: number
 *         response:
 *           type: string
 *         envelope:
 *           type: object
 *           properties:
 *             from:
 *               type: string
 *             to:
 *               type: array
 *               items:
 *                type: string
 *         messageId:
 *           type: string
 */

/**
 * @openapi
 * /api/mail:
 *   get:
 *     tags:
 *       - Mail
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                   example: 1
 *                 mails:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Mail"
 *   post:
 *     tags:
 *       - Mail
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               from:
 *                 type: string
 *                 example: test.from@gmail.com
 *               to:
 *                 type: string
 *                 example: test.to@gmail.com
 *               subject:
 *                 type: string
 *                 example: Test
 *               text:
 *                 type: string
 *                 example: Test send mail
 *               html:
 *                 type: string
 *                 example: <h1>Hello World</h1>
 *             required:
 *               - from
 *               - to
 *               - subject
 *               - text
 *               - html
 *     responses:
 *       201:
 *         description: CREATED
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: Email sent successfully
 *       400:
 *         description: BAD REQUEST
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get('/', getAllMails).post('/', createOneMail)

export default router
