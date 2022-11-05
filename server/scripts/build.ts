import { buildAbilities } from '../data/ability/build.js'

await buildAbilities()

const { buildPokemon } = await import('../data/pokemon/build.js')
await buildPokemon()
