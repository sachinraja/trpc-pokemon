import { AnyRouter, inferRouterContext } from '@trpc/server'
import { HTTPBaseHandlerOptions } from '@trpc/server/dist/declarations/src/http/internals/types.js'

export type FetchCreateContextFnOptions = {
	req: Request
}

export type FetchCreateContextFn<TRouter extends AnyRouter> = (opts: {
	req: Request
}) => inferRouterContext<TRouter> | Promise<inferRouterContext<TRouter>>

export type FetchCreateContextOption<TRouter extends AnyRouter> = unknown extends inferRouterContext<TRouter> ? {
	/**
	 * @link https://trpc.io/docs/context
	 */
	createContext?: FetchCreateContextFn<TRouter>
}
	: {
		/**
		 * @link https://trpc.io/docs/context
		 */
		createContext: FetchCreateContextFn<TRouter>
	}

export type FetchHandlerOptions<TRouter extends AnyRouter> =
	& HTTPBaseHandlerOptions<TRouter, Request>
	& FetchCreateContextOption<TRouter>
