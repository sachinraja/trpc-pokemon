import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '../server/router/_app.js'

export default {
	async fetch(request: Request): Promise<Response> {
		const response = await fetchRequestHandler({
			endpoint: '',
			req: request,
			createContext: () => {
				return {}
			},
			router: appRouter,
		})

		response.headers.set('cache-control', 'max-age=86400')

		return response
	},
}
