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

        const emailObject = {
            to: "aapctest27394962@gmail.com",
            from: email,
            subject: `New message from ${name} via AAPC Website`,

            text: `
            ${name} messaged you:\n
            ${message}\n
            You can reply to their email: ${email}`,

            html: `
            <h1><a href="mailto:${email}">${name}</a> messaged you:</h1>
            <p>${message}</p>
            <p>You can reply to their email: <a href="mailto:${email}">${email}</a></p>
            `,
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
