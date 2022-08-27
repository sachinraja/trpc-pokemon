import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { fetch } from 'undici'

export const readJson = async (path: string) => {
	const text = await readFile(path, 'utf8')
	return JSON.parse(text)
}

export const writeJson = async (path: string, data: any) => {
	await writeFile(path, JSON.stringify(data), 'utf8')
}

export const readGraphQLAndFetch = async (dirname: string) => {
	try {
		const cachedData = await readJson(path.join(dirname, 'cached-response.json'))
		return cachedData
	} catch (e) {
		const error = e as { code?: string }

		if (error.code !== 'ENOENT') {
			throw error
		}
	}

	const queryText = await readFile(path.join(dirname, 'query.graphql'), 'utf8')

	const response = await fetch('https://beta.pokeapi.co/graphql/v1beta', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ query: queryText }),
	})

	const result: any = await response.json()
	const data = result.data.result

	await writeJson(path.join(dirname, 'cached-response.json'), data)

	return data
}

export const writeFormatted = async (opts: { data: any; dirname: string; type: string; exportName: string }) => {
	const stringified = JSON.stringify(opts.data)
	await Promise.all(
		[
			writeFile(path.join(opts.dirname, 'data.js'), `export const ${opts.exportName} = ${stringified}`, 'utf8'),
			writeFile(
				path.join(opts.dirname, 'data.d.ts'),
				[
					`import { ${opts.type} } from '../../types'`,
					`export declare const ${opts.exportName}: ${opts.type}[]`,
				].join('\n') + '\n',
				'utf8',
			),
		],
	)
}

export const getDirnameFromImportMeta = (importMetaUrl: string) => {
	return path.dirname(fileURLToPath(importMetaUrl))
}
