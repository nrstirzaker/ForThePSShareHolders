import type {APIRoute, APIContext } from "astro";
import {sql} from '@/lib/neon';
import {DateTime} from 'luxon'

import {ErrorCode} from "@/lib/error/ErrorCode.ts";
import {NeonDbError} from "@neondatabase/serverless";
import {RegisterAPIDataResponse} from "@/lib/RegisterAPIDataResponse.ts";
import {logger} from "@/utils/logger"

const MULTI_REGISTRATION_TIMEOUT: number = import.meta.env.MULTI_REGISTRATION_TIMEOUT
const MULTI_REGISTRATION_LIMIT: number = parseInt(import.meta.env.MULTI_REGISTRATION_LIMIT)

const TABLE: string = "participants";

export const POST: APIRoute = (async ({request, clientAddress} : APIContext) => {

    const formData = await request.formData();
    const emailAddress = formData.get("emailAddress")?.toString();
    const ipAddress = clientAddress

    const createdAt = DateTime.now().toUTC();
    const errorCodes: ErrorCode[] = []

    let lastId: number | undefined;

    try {

        const mostRecentCreatedAtRecords = await sql`select max(created_at)
                                                     from ${sql.unsafe(TABLE)}
                                                     where ip_address = ${ipAddress} 
                                                     and ip_address != null`

        const mostRecentCreatedAtInMillis = DateTime.fromJSDate(mostRecentCreatedAtRecords[0].max).toUTC().toMillis()
        if (DateTime.utc().toMillis() - mostRecentCreatedAtInMillis < MULTI_REGISTRATION_TIMEOUT) {
            errorCodes.push(ErrorCode.MaxRegistrationSpeed);
            logger.log({level: "info", message: "Speed of Registration Limit reached" + ipAddress});
        }

        const howManyRegisteredFromThisIPRecords = await sql`select count(*)
                                                             from ${sql.unsafe(TABLE)}
                                                             where ip_address = ${ipAddress}
                                                             and ip_address != null`

        const howManyRegisteredFromThisIP: number = parseInt(howManyRegisteredFromThisIPRecords[0].count);
        if (howManyRegisteredFromThisIP > MULTI_REGISTRATION_LIMIT) {
            errorCodes.push(ErrorCode.MaxEmailsFromThisIPAddress)
            logger.log({level: "info", message: "Max Registration Limit reached for ip address" + ipAddress});
        }
        if (errorCodes.length === 0) {

            await sql`INSERT INTO participants ("email_address", "ip_address", "created_at")
                                             VALUES (${emailAddress}, ${ipAddress}, ${createdAt})`;

            logger.log({level: "info", message: "Email: " + emailAddress + ", ip address: " + ipAddress + " registered"});

            const lastIdResponse = await sql`SELECT last_value FROM participants_id_seq`
            lastId = lastIdResponse[0].last_value


        }


    } catch (error: unknown) {

        if (error instanceof NeonDbError) {
            errorCodes.push(ErrorCode.DuplicateEmail)
        } else {
            errorCodes.push(ErrorCode.Unknown)
        }

    }

    const registrationResponse = new RegisterAPIDataResponse(emailAddress, lastId, errorCodes)


    return new Response(
        JSON.stringify(registrationResponse),
        {status: 200}
    );


}) satisfies APIRoute;
export default POST