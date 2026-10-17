import pactum from 'pactum';

// it ("should respond with status code 200 and with json data", async () => {
//     await pactum.spec()
//         .get('http://localhost:4321/api/v1/register')
//         .expectStatus(200)
//         .expectJsonLike({"status":"Success"})
// })

it('should respond with status code 200, but also Validation Error', async () => {
	await pactum.spec().post('http://localhost:4321/api/v1/register').withJson({}).expectStatus(200).expectJsonLike({ message: 'Validation Error' });
});
