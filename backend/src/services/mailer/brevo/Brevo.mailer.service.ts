import IMailer from "@/services/mailer/mailer.service"
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

    async sendEmailMessage(email: string, name: string, message: string): Promise<void> {
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
        await this.brevoTransport.sendMail(emailObject)
    }
}
