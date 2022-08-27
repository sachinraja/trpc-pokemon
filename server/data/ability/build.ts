import { getDirnameFromImportMeta, readGraphQLAndFetch, writeFormatted } from '../../scripts/utils.js'

export const buildAbilities = async () => {
	const __dirname = getDirnameFromImportMeta(import.meta.url)
	const rawAbilities = await readGraphQLAndFetch(__dirname)

	const abilities = rawAbilities.map((ability: any) => {
		return {
			id: ability.name,
			name: ability.ability_names[0].name,
			generation: ability.generation.id,
			flavorDescription: ability.flavor_text[0]?.description,
			effectShortDescription: ability.effect_texts[0]?.short_effect,
			effectLongDescription: ability.effect_texts[0]?.effect,
		}
	})

	writeFormatted({
		data: abilities,
		dirname: __dirname,
		exportName: 'abilities',
		type: 'Ability',
	})
}
