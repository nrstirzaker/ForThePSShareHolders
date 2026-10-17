import type { ErrorCode } from '@/lib/error/ErrorCode.ts';

export interface APIResponseBuilder {
	data(data: Map<string, string>): APIResponseBuilder;
	errorCodes(errorCodes: ErrorCode[]): APIResponseBuilder;
	nextPage(partialURL: string): APIResponseBuilder;
	build(): APIResponseBuilder;
}
