import { z } from "astro:schema";
import {logger} from "@/utils/logger"
import {ErrorCodes} from "@/lib/error/ErrorCodes.ts";
import ErrorCode = ErrorCodes.ErrorCode;


export const RegistrationSchema = z.object({
    emailAddress: z.email({
        error: (emailAddress) => {
            if (!emailAddress.input){
                return ErrorCode.EmailAddressRequired;
            }
            if(emailAddress.code === "invalid_format"){
                return ErrorCode.EmailAddressInvalidFormat
            }

        }
    })
    // emailAddress: z.email({
    //     error: (emailAddress) => {
    //
    //         // logger.info({level : "debug",message:"emailAddress: " + JSON.stringify(emailAddress.input)});
    //         // logger.info({level:"info",message:"emailAddress.code:" + emailAddress.code}) // the issue code
    //         // logger.info({level:"info",message:"emailAddress.input:" + emailAddress.input}) // the issue code
    //         // logger.info({level:"info",message:"emailAddress.inst:" + emailAddress.inst}) // the issue code
    //         // logger.info({level:"info",message:"emailAddress.schema:" + emailAddress.schema}) // the issue code
    //         // logger.info({level:"info",message:"emailAddress .path:" + emailAddress.path}) // the issue code
    //         // if (!emailAddress.input){
    //         //     return "Email address is Mandatory"
    //         // }
    //         // if(emailAddress.code === "invalid_format"){
    //         //     return "Email address not formatted correctly"
    //         // }
    //
    //
    //     }
    // })
});

export type Registration = {
    emailAddress: string
}
