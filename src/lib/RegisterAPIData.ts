import type {ErrorCode} from "@/lib/error/ErrorCode.ts";

export interface RegisterAPIData {
    emailAddress: string | undefined;
    lastId: number | undefined;
    errorCodes: ErrorCode[] | undefined;

}