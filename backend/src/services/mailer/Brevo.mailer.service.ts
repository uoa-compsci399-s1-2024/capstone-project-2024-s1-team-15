import IMailer, { ContactFormInputs } from "./mailer.service"
import { createTransport, Transporter } from "nodemailer"

export default class BrevoMailer implements IMailer {
    brevoTransport: Transporter

    constructor(user: string, pass: string) {
        this.brevoTransport = createTransport({
            host: "smtp-relay.brevo.com",
            port: 587,
            auth: { user, pass },
        })
    }

    async sendNotificationForContactForm({ email, name, message }: ContactFormInputs) {
        if (!email) throw Error("user email not provided")

        let emailObject = {
            to: "aapctest27394962@gmail.com",
            from: email,
            subject: `New Message from AAPC Website from ${name}`,
            html: `<h1>You have recieved a message from the AAPC Website</h1><p>${message}</p>`,
        }

        try {
            const info = await this.brevoTransport.sendMail(emailObject)
            console.log(JSON.stringify(info))
        } catch (e: any) {
            throw Error(
                `An error occurred and the AAPC were not sent your message. Here are the error details: ${e.message}`
            )
        }
    }
}
