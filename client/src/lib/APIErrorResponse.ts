import type {ErrorCode} from "@/lib/error/ErrorCode.ts";

export interface APIErrorResponse {
    errorCodes: ErrorCode[] | undefined;
}