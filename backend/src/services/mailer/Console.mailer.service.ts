import IMailer, { ContactFormInputs } from "./mailer.service"

export default class ConsoleMailer implements IMailer {
    async sendNotificationForContactForm(contactFormInputs: ContactFormInputs) {
        const { email, name, message } = contactFormInputs

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
            console.log("----------------- New Email Notification ----------------------")
            console.log(emailObject)
            console.log("\n\n\n")
        } catch (e: any) {
            throw Error(
                `An error occurred and the AAPC were not sent your message. Here are the error details: ${e.message}`
            )
        }
    }
}
