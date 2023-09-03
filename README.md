# trpc-pokemon

public tRPC Pokemon API

## Install

```sh
npm install trpc-pokemon@next @trpc/server
```

## Usage

View playground at https://v10.pokemon.s4n.land/play.

```ts
import { createTRPCClient } from '@trpc/client'
import { PokemonRouter, trpcPokemonUrl } from 'trpc-pokemon'

const client = createTRPCProxyClient<PokemonRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
      // You can pass any HTTP headers you wish here
      async headers() {
        return {
          authorization: getAuthCookie(),
        };
      },
    }),
  ],
});


const bulbasaur = await client.pokemon.byId.query('bulbasaur')
const chlorophyll = await client.pokemon.byId.query('chlorophyll')
```

## Routes

`pokemon.all` - get all pokemon

`pokemon.byId` - get a pokemon by id

`ability.all` - get all abilities

`ability.byId` - get an ability by id

## Data

The data is statically built from [PokeAPI](https://pokeapi.co/).
