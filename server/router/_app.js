import { z } from 'zod';
import { pokemons } from '../data/pokemon/data.js';
import { abilitiesRouter } from './abilities.js';
import { t } from './trpc.js';
export const appRouter = t.router({
    getPokemon: t.procedure.input(z.string()).query(({ input }) => {
        return pokemons.find((pokemon) => input === pokemon.id);
    }),
    abilities: abilitiesRouter,
});
