import { ForbiddenError } from "@/errors/HTTPErrors"
import { MAILER } from "@/services/services"
import { RequestHandler } from "express"
import { validate } from "@/util/functions";
import { ContactIn } from "@/util/validation/input.types";

export default class ContactController {
    static sendContactEmail: RequestHandler = async (req, res, next) => {
        const body = validate(ContactIn, req.body)
        const secret = process.env.GOOGLE_RECAPTCHA_SECRET_KEY
        if (secret) {
            const searchParams = new URLSearchParams({
                secret, response: body.recaptchaToken
            })
            const response = await fetch("https://www.google.com/recaptcha/api/siteverify?" + searchParams, {
                method: "post"
            })
            const data = await response.json()
            if (!data.success) throw new ForbiddenError("reCAPTCHA verification failed.")
        }
        await MAILER.sendEmailMessage(body.email, body.name, body.message)
        res.sendStatus(204)
        next()
    }
}
