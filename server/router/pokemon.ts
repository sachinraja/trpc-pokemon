import { router, TRPCError } from '@trpc/server'
import { z } from 'zod'
import { pokemons } from '../data/pokemon/data.js'

export const pokemonRouter = router()
	.query('all', {
		resolve() {
			return pokemons
		},
	})
	.query('byId', {
		input: z.string(),
		resolve: ({ input }) => {
			const pokemon = pokemons.find((pokemon) => input === pokemon.id)

			if (!pokemon) {
				throw new TRPCError({ code: 'NOT_FOUND' })
			}

			return pokemon
		},
	})
