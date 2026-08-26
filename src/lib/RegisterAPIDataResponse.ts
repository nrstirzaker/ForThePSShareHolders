import type {ErrorCode} from "@/lib/error/ErrorCode.ts";
import type {RegisterAPIData} from "@/lib/RegisterAPIData.ts";

export class RegisterAPIDataResponse implements RegisterAPIData{

    emailAddress: string | undefined;
    lastId: number | undefined;
    errorCodes: ErrorCode[] | undefined;

    // public getLastId(): number | undefined {
    //     return this.lastId;
    // }
    //
    // public getErrorCodes(): ErrorCode[] | undefined {
    //     return this.errorCodes;
    // }
    // public getEmailAddress(): string | undefined {
    //     return this.emailAddress;
    // }

    public constructor(emailAddress: string | undefined, lastId: number | undefined, errorCodes: ErrorCode[] | undefined) {
        this.emailAddress = emailAddress
        this.lastId = lastId
        this.errorCodes = errorCodes
    }
}
