# trpc-pokemon

public tRPC Pokemon API

## Install

```sh
npm install trpc-pokemon
```

> **Warning**
> You must be on `@trpc/server@^10.0.0-alpha.25` and `@trpc/client@^10.0.0-alpha.25`. This is because this version is agnostic from Node and we deploy to a Cloudflare Worker.

## Usage

```ts
import { createTRPCClient } from '@trpc/client'
import { PokemonRouter, trpcPokemonUrl } from 'trpc-pokemon'

const client = createTRPCClient<PokemonRouter>({
	// https://pokemon.s4n.land
	url: trpcPokemonUrl,
})

const bulbasaur = await client.query('pokemon.byId', 'bulbasaur')
const chlorophyll = await client.query('ability.byId', 'chlorophyll')
```

## Routes

`pokemon.all` - get all pokemon

`pokemon.byId` - get a pokemon by id

`ability.all` - get all abilities

`ability.byId` - get an ability by id

## Data

The data is statically built from [PokeAPI](https://pokeapi.co/).
