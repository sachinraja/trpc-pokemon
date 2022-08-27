import path from 'node:path'
import { readJson, writeFormatted } from '../../scripts/utils.js'

export const buildPokemon = () => {
	const pokemons = readJson(path.join(__dirname, 'raw.json'))

	const newPokemon = pokemons.map((pokemon: any) => {
		return {
			id: pokemon.name,
			weight: pokemon.weight,
			height: pokemon.height,
			baseExperience: pokemon.base_experience,
			abilities: pokemon.abilities.map((ability: any) => ability.ability.id),
		}
	})

	writeFormatted({
		data: newPokemon,
		dirname: __dirname,
		exportName: 'pokemons',
		type: 'Pokemon',
	})
}
