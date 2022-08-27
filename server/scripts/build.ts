import { buildAbilities } from '../data/ability/build.js'
import { buildPokemon } from '../data/pokemon/build.js'

await Promise.all([
	buildAbilities(),
	buildPokemon(),
])
