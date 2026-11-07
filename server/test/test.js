import pactum from 'pactum';
import { faker } from '@faker-js/faker';

// it ("should respond with status code 200 and with json data", async () => {
//     await pactum.spec()
//         .get('http://localhost:4321/api/v1/register')
//         .expectStatus(200)
//         .expectJsonLike({"status":"Success"})
// })

it('should respond with status code 200', async () => {
	await pactum.spec().post('http://localhost:3001/api/v1/register').withBody({emailAddress : faker.internet.email() }).expectStatus(200);
});
