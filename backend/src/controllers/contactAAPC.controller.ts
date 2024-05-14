import { MAILER } from "@/services/services"
import { RequestHandler } from "express"

export default class ContactAAPCController {
    static sendNotificationToAAPC: RequestHandler = async (req, res, next) => {
        const contactFormInputs = req.body
        await MAILER.sendNotificationForContactForm(contactFormInputs)
        res.sendStatus(200)
        next()
    }
}
