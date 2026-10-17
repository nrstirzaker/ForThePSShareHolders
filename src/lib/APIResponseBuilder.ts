import { APIResponse } from '@/lib/APIResponse.ts';
import { RegisterAPIResponse } from '@/lib/RegisterAPIResponse.ts';
import { ErrorCodes } from '@/lib/error/ErrorCode.ts';
import ErrorCode = ErrorCodes.ErrorCode;

export abstract class APIResponseBuilder<T> {
	protected _data: Map<string, string> = new Map();
	protected _nextPage: string = '';
	protected _errorCodes: ErrorCode[] = [];

	setData(data: Map<string, string>): this {
		this._data = data;
		return this;
	}
	setErrorCodes(errorCodes: ErrorCode[]): this {
		this._errorCodes = errorCodes;
		return this;
	}
	setNextPage(partialURL: string): this {
		this._nextPage = partialURL;
		return this;
	}

	public getData() {
		return this._data;
	}

	getNextPage() {
		return this._nextPage;
	}
	getErrorCodes() {
		return this._errorCodes;
	}

	abstract build(): T;
}
