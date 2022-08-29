import { createTRPCClient } from '@trpc/client'
import { httpLink } from '@trpc/client/links/httpLink/dist/trpc-client-links-httpLink.cjs'
import { fetch } from 'undici'
import { PokemonRouter } from '../index.js'

const client = createTRPCClient<PokemonRouter>({
	// https://pokemon.s4n.land
	url: 'http://localhost:8787',
	fetch,
})

console.log('start')
const bulbasaur = await Promise.all([
	client.query('pokemon.byId', 'bulbasaur'),
	client.query('pokemon.byId', 'bulbasaur'),
])
console.log('end')
console.log(bulbasaur)
