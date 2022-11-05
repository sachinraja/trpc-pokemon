import { abilityRouter } from './ability.js'
import { pokemonRouter } from './pokemon.js'
import { router } from './trpc.js'

export const appRouter = router({
	pokemon: pokemonRouter,
	ability: abilityRouter,
})

export type AppRouter = typeof appRouter
