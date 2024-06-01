export default interface IMailer {
    sendEmailMessage(email: string, name: string, message: string): Promise<void>
}
