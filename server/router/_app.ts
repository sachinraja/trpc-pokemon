import { router } from '@trpc/server'
import { abilityRouter } from './ability.js'
import { pokemonRouter } from './pokemon.js'

export const appRouter = router()
	.merge('pokemon.', pokemonRouter)
	.merge('ability.', abilityRouter)

export type AppRouter = typeof appRouter
