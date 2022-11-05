import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { abilities } from '../data/ability/data.js'
import { procedure, router } from './trpc.js'

export const abilityRouter = router({
	all: procedure.query(() => abilities),
	byId: procedure.input(z.string()).query(({ input }) => {
		const ability = abilities.find((ability) => input === ability.id)

		if (!ability) {
			throw new TRPCError({ code: 'NOT_FOUND' })
		}

		return ability
	}),
})
