export interface Ability {
	id: string
	name: string
	generation: number
	flavorDescription: string
	effectShortDescription: string
	effectLongDescription: string
}

export interface Pokemon {
	id: string
	weight: number
	height: number
	baseExperience: number
	abilities: { id: string; name: string }[]
}
