export class ErrorMessages {
    emailAddressErrorMessage: string | undefined
    maxEmailsFromThisIPAddress: string | undefined
    maxRegistrationSpeed : string | undefined

    public constructor(){
        this.emailAddressErrorMessage = undefined
        this.maxEmailsFromThisIPAddress = undefined
        this.maxRegistrationSpeed = undefined
    }
}