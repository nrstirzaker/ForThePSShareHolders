import 'dotenv/config'
import express, { type Express, type Request, type Response } from 'express';
import { sql } from './lib/neon.ts';
import { DateTime } from 'luxon';


const port = 3001;
const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (request: Request, response: Response) => {
    console.log("server:get: " + request.url);
    response.send({success:true}).sendStatus(200)
});

app.post('/api/v1/register', async(request: Request, response: Response) => {
    const body = request.body
    const emailAddress = request?.body.emailAddress;
    const ipAddress = request.ip;
    const createdAt = DateTime.now().toUTC();
    await sql`
                INSERT
                INTO participants("email_address", "ip_address", "created_at")
                VALUES (${emailAddress}, ${ipAddress}, ${createdAt})`;
    response.status(200).json({success:true})

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});