import { router, TRPCError } from '@trpc/server'
import { z } from 'zod'
import { abilities } from '../data/ability/data.js'

export const abilityRouter = router()
	.query('all', {
		resolve() {
			return abilities
		},
	})
	.query('byId', {
		input: z.string(),
		resolve: ({ input }) => {
			const ability = abilities.find((ability) => input === ability.id)

			if (!ability) {
				throw new TRPCError({ code: 'NOT_FOUND' })
			}

			return ability
		},
	})
