import { getDirnameFromImportMeta, readGraphQLAndFetch, writeFormatted } from '../../scripts/utils.js'
import { Pokemon } from '../../types.js'
import { abilities } from '../ability/data.js'

export const buildPokemon = async () => {
	const __dirname = getDirnameFromImportMeta(import.meta.url)
	const pokemons: Record<string, any>[] = await readGraphQLAndFetch(__dirname)

	const newPokemon = pokemons.map<Pokemon>((pokemon) => {
		return {
			id: pokemon.name,
			weight: pokemon.weight,
			height: pokemon.height,
			baseExperience: pokemon.base_experience,
			abilities: (pokemon.abilities as Record<string, any>[]).map((ability) => {
				const id = ability.ability.id
				const { name } = abilities.find((ability) => ability.id === id)!
				return {
					id,
					name,
				}
			}),
		}
	})

	await writeFormatted({
		data: newPokemon,
		dirname: __dirname,
		exportName: 'pokemons',
		type: 'Pokemon',
	})
}
