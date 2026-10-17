import type { ErrorCode } from '@/lib/error/ErrorCode.ts';

export class APIResponse {
	protected _data: Map<string, string> | undefined;
	protected _nextPage: string | undefined;
	protected _errorCodes: ErrorCode[] | undefined;

	constructor(data: Map<string, string> | undefined, errorCodes: ErrorCode[] | undefined, nextPage: string | undefined) {
		this._data = data;
		this._errorCodes = errorCodes;
		this._nextPage = nextPage;
	}
}
