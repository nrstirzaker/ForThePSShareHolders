import { ErrorCodes } from '@/lib/error/ErrorCode.ts';
const ErrorCode = ErrorCodes.ErrorCode;

export interface APIResponseBuilder {
	data(data: Map<string, string>): APIResponseBuilder;
	errorCodes(errorCodes: ErrorCode[]): APIResponseBuilder;
	nextPage(partialURL: string): APIResponseBuilder;
	build(): APIResponseBuilder;
}
