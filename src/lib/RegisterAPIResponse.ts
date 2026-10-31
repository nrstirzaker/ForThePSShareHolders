import { ErrorCodes } from '@/lib/error/ErrorCode.ts';
import ErrorCode = ErrorCodes.ErrorCode;
import { APIResponse } from '@/lib/APIResponse.ts';
import { APIResponseBuilder } from '@/lib/APIResponseBuilder.ts';

export class RegisterAPIResponse extends APIResponse {
	private emailAddress: string | undefined;
	private lastId: string | undefined;

	constructor(data: Map<string, string> | undefined, errorCodes: ErrorCode[] | undefined, nextPage: string | undefined) {
		super(data, errorCodes, nextPage);

		this.emailAddress = data!.get('emailAddress') ?? undefined;
		this.lastId = data!.get('lastId') ?? undefined;
	}

	static get builder() {
		return new (class Responder extends APIResponseBuilder<RegisterAPIResponse> {
			build() {
				return new RegisterAPIResponse(super.getData(), super.getErrorCodes(), super.getNextPage());
			}
		})();
	}

	public getEmailAddress(): string | undefined {
		return this.emailAddress;
	}

	public getLastId(): string | undefined {
		return this.lastId;
	}
}
