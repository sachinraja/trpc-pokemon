import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '../server/router/_app.js'

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
	'Access-Control-Max-Age': '86400',
}

const handleOptions = (request: Request) => {
	// make sure the necessary headers are present
	// for this to be a valid pre-flight request
	const { headers } = request
	const requestHeaders = headers.get('access-control-request-headers')
	if (
		headers.get('origin') !== null
		&& headers.get('access-control-request-method') !== null
		&& requestHeaders !== null
	) {
		const responseHeaders = {
			...corsHeaders,
			'access-control-allow-headers': requestHeaders,
		}

		return new Response(null, {
			headers: responseHeaders,
		})
	} else {
		return new Response(null, {
			headers: {
				Allow: 'GET, HEAD, POST, OPTIONS',
			},
		})
	}
}

export default {
	async fetch(request: Request): Promise<Response> {
		if (request.method === 'OPTIONS') {
			return handleOptions(request)
		}

		const response = await fetchRequestHandler({
			endpoint: '',
			req: request,
			createContext: () => {
				return {}
			},
			router: appRouter,
		})

		response.headers.set('access-control-allow-origin', '*')
		response.headers.set('access-control-allow-methods', 'GET, POST, PUT, DELETE, OPTIONS')
		response.headers.set('cache-control', 'max-age=86400')

		return response
	},
}
