import { createTRPCClient } from '@trpc/client'
import { fetch } from 'undici'
import { PokemonRouter, trpcPokemonUrl } from '../index.js'

// @ts-expect-error polyfill
globalThis.fetch = async (url, options) => {
	const res = await fetch(url, options)
	console.log(await res.text())
	process.exit()
	return res
}

const client = createTRPCClient<PokemonRouter>({
	// https://pokemon.s4n.land
	url: trpcPokemonUrl,
})

const bulbasaur = await Promise.all([
	client.query('pokemon.byId', 'bulbasaur'),
	client.query('pokemon.byId', 'bulbasaur'),
])

console.log(bulbasaur)
