import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { fetch } from 'undici'

export const readJson = (path: string) => {
	const text = readFileSync(path, 'utf8')
	return JSON.parse(text)
}

export const readGraphQLAndFetch = async (dirname: string) => {
	try {
		const cached = readFileSync(path.join(dirname, 'cached-response.json'), 'utf8')
		return JSON.parse(cached)
	} catch (e) {
		const error = e as { code?: string }

		if (error.code !== 'ENOENT') {
			throw error
		}
	}

	const queryText = readFileSync(path.join(dirname, 'query.graphql'), 'utf8')

	const response = await fetch('https://beta.pokeapi.co/graphql/v1beta', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ query: queryText }),
	})

	const result: any = await response.json()
	const data = result.data.result

	writeFileSync(path.join(dirname, 'cached-response.json'), JSON.stringify(data), 'utf8')

	return data
}

export const writeFormatted = (opts: { data: any; dirname: string; type: string; exportName: string }) => {
	const stringified = JSON.stringify(opts.data)
	writeFileSync(path.join(opts.dirname, 'data.js'), `export const ${opts.exportName} = ${stringified}`, 'utf8')
	writeFileSync(
		path.join(opts.dirname, 'data.d.ts'),
		[
			`import { ${opts.type} } from '../../types'`,
			`export declare const ${opts.exportName}: ${opts.type}[]`,
		].join('\n') + '\n',
		'utf8',
	)
}

export const getDirnameFromImportMeta = (importMetaUrl: string) => {
	return path.dirname(fileURLToPath(importMetaUrl))
}
