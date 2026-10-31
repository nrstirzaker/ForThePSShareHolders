import { FormTypeEnum } from '@/lib/FormTypeEnum.ts';
import { ErrorCodes } from '@/lib/error/ErrorCode.ts';
import ErrorCode = ErrorCodes.ErrorCode;
import { ErrorMessages } from '@/lib/error/ErrorMessages.ts';

export class ErrorLoggerMessageFactory {
	static #instance: ErrorLoggerMessageFactory;

	/**
	 * The Singleton's constructor should always be private to prevent direct
	 * construction calls with the `new` operator.
	 */
	private constructor() {}

	/**
	 * The static getter that controls access to the singleton instance.
	 *
	 * This implementation allows you to extend the Singleton class while
	 * keeping just one instance of each subclass around.
	 */
	public static get instance(): ErrorLoggerMessageFactory {
		if (!ErrorLoggerMessageFactory.#instance) {
			ErrorLoggerMessageFactory.#instance = new ErrorLoggerMessageFactory();
		}

		return ErrorLoggerMessageFactory.#instance;
	}

	public getMessage(form: FormTypeEnum, errorCodes: ErrorCode[] | undefined): ErrorMessages {
		const response: ErrorMessages = new ErrorMessages();

		if (!errorCodes) {
			return response;
		}

		if (form === FormTypeEnum.Registration) {
			response.emailAddressErrorMessage = errorCodes.includes(ErrorCode.DuplicateEmail) ? 'Email address has already been registered' : '\u00a0'; //which is &nbsp
			response.maxEmailsFromThisIPAddress = errorCodes.includes(ErrorCode.MaxEmailsFromThisIPAddress) ? 'HACK?: Too many registrations from same IP' : '\u00a0'; //which is &nbsp
			response.maxRegistrationSpeed = errorCodes.includes(ErrorCode.MaxRegistrationSpeed) ? 'HACK?: Max registration speed exceeded' : '\u00a0'; //which is &nbsp
		}

		return response;
	}
}
