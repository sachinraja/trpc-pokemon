import { createTRPCClient } from '@trpc/client'
import { fetch } from 'undici'
import { PokemonRouter, trpcPokemonUrl } from '../index.js'

// @ts-expect-error polyfill
globalThis.fetch = fetch

const client = createTRPCClient<PokemonRouter>({
	// https://pokemon.s4n.land
	url: trpcPokemonUrl,
})

const bulbasaur = await client.query('pokemon.byId', 'bulbasaur')
const chlorophyll = await client.query('ability.byId', 'chlorophyll')

console.log(bulbasaur)
console.log(chlorophyll)
