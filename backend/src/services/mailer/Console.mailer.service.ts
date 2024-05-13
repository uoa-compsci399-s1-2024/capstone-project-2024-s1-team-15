import IMailer, { ContactFormInputs } from "./mailer.service"

export default class ConsoleMailer implements IMailer {
    async sendNotificationForContactForm(contactFormInputs: ContactFormInputs) {
        const { email, name, message } = contactFormInputs

        if (!email) throw Error("user email not provided")

        let emailObject = {
            to: "aapctest27394962@gmail.com",
            from: email,
            subject: `New Message from AAPC Website from ${name}`,
            html: `<h1>You have recieved a message from the AAPC Website</h1><p>${message}</p>`,
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
