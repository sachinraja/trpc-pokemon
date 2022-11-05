import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { pokemons } from '../data/pokemon/data.js'
import { procedure, router } from './trpc.js'

export const pokemonRouter = router({
	all: procedure.query(() => pokemons),
	byId: procedure.input(z.string()).query(({ input }) => {
		const pokemon = pokemons.find((pokemon) => input === pokemon.id)

		if (!pokemon) {
			throw new TRPCError({ code: 'NOT_FOUND' })
		}

		return pokemon
	}),
})
