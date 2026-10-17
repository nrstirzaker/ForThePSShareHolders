
import {defineMiddleware} from "astro:middleware";
import {logger} from "@/utils/logger"


export const onRequest = defineMiddleware(async (context, next) => {

    // intercept data from a request
    // optionally, modify the properties in `locals`
    const {pathname} = context.url
    logger.log({level:"info", message:`Middleware Received ${pathname}`})

    // return a Response or the result of calling `next()`
    return next();
});