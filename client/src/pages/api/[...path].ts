import type { APIRoute } from 'astro';

export const ALL :APIRoute = (async ({ params, request }) => {

	const queryParams = new URL(request.url).search;
	const path: string = 'http://localhost:3001/api/' + params.path + queryParams;
	const method: string = request.method;
	const bodyAsJson: string | undefined = await getBodyAsJson(request);

	const response = await fetch(path, {
		method: method,
		headers: {
			'Content-Type': 'application/json'
		},
		body: bodyAsJson
	});

	const responseJson = await response.json();

	return new Response(
		JSON.stringify({
			message: responseJson
		}),
		{
			status: response.status
		}
	);
}) satisfies APIRoute;


const getBodyAsJson: string = (async (request: Request) => {

	const body = (await request.body) ? await request.json() : undefined;
	const bodyAsJson = body !== undefined ?  JSON.stringify(body) : undefined;
	return bodyAsJson;

})