import { ForbiddenError } from "@/errors/HTTPErrors"
import { MAILER } from "@/services/services"
import { RequestHandler } from "express"

export default class ContactAAPCController {
    static sendNotificationToAAPC: RequestHandler = async (req, res, next) => {
        const contactFormInputs = req.body

        // verify recatpcha: https://developers.google.com/recaptcha/docs/verify#api-request
        const secret = process.env.GOOGLE_RECAPTCHA_SECRET_KEY
        if (secret) {
            const recaptchaVerificationResult = await (
                await fetch(
                    "https://www.google.com/recaptcha/api/siteverify?" +
                        new URLSearchParams({
                            secret,
                            response: contactFormInputs.recaptchaToken,
                        }),
                    {
                        method: "POST",
                    }
                )
            ).json()

            if (!recaptchaVerificationResult.success)
                throw new ForbiddenError("Recaptcha verification failed, try again.")
        }

        await MAILER.sendNotificationForContactForm(contactFormInputs)
        res.sendStatus(200)
        next()
    }
}
