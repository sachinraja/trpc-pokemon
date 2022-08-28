# trpc-pokemon

public tRPC Pokemon API

## Install

```sh
npm install trpc-pokemon
```

## Usage

```ts
import { createTRPCClient } from '@trpc/client'
import { PokemonRouter, trpcPokemonUrl } from 'trpc-pokemon'

const client = createTRPCClient<PokemonRouter>({
	// https://pokemon.s4n.land
	url: trpcPokemonUrl,
})

const bulbasaur = await client.query('pokemon.byId', 'bulbasaur')
const ability = await client.query('ability.byId', 'chlorophyll')
```

## Routes

`pokemon.all` - get all pokemon

`pokemon.byId` - get a pokemon by id

`ability.all` - get all abilities

`ability.byId` - get an ability by id

## Data

The data is statically built from [PokeAPI](https://pokeapi.co/).
