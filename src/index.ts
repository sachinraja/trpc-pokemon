import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '../server/router/_app.js'

export default {
	async fetch(request: Request): Promise<Response> {
		return fetchRequestHandler({
			endpoint: '',
			req: request,
			createContext: () => {
				return {}
			},
			router: appRouter,
		})
	},
}
