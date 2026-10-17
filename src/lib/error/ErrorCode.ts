export namespace ErrorCodes {
	export enum ErrorCode {
		Unknown = 'Unknown',
		DuplicateEmail = 'Duplicate Email',
		MaxEmailsFromThisIPAddress = 'MaxEmailsFromThisIPAddress',
		MaxRegistrationSpeed = 'MaxRegistrationSpeed',
		IPAddressNotAvailable = 'IPAddressNotAvailable',
		EmailAddressInvalidFormat = 'EmailAddressInvalidFormat',
		EmailAddressRequired = 'EmailAddressRequired'
	}

	const reverseMap = new Map<string, ErrorCode>();
	Object.keys(ErrorCode).forEach((s: string) => {
		const e = (<any>ErrorCode)[s];
		reverseMap.set(e.toString(), e);
	});
	export function valueOf(str: string) {
		return reverseMap.get(str);
	}
}
