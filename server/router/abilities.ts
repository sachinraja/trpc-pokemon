import { z } from 'zod'
import { abilities } from '../data/ability/data.js'
import { t } from './trpc.js'

export const abilitiesRouter = t.router({
	byId: t.procedure.input(z.string()).query(({ input }) => {
		return abilities.find((ability) => input === ability.id)
	}),
})
