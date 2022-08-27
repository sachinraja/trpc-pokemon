import { getDirnameFromImportMeta, readGraphQLAndFetch, writeFormatted } from '../../scripts/utils.js'

export const buildPokemon = async () => {
	const __dirname = getDirnameFromImportMeta(import.meta.url)
	const pokemons = await readGraphQLAndFetch(__dirname)

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

buildPokemon()
