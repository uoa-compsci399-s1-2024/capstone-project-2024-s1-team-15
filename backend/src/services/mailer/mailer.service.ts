export type ContactFormInputs = {
    email: string
    name: string
    message: string
}

export default interface IMailer {
    sendNotificationForContactForm(contactFormInputs: ContactFormInputs): Promise<any>
}
