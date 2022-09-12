import { renderPlaygroundPage } from '@trpc-playground/html'
import esbuild from 'esbuild'
import ignorePlugin from 'esbuild-plugin-ignore'
import { writeFileSync } from 'node:fs'
import { resolveConfig } from 'trpc-playground'
import { appRouter } from './server/router/_app.js'

const config = resolveConfig({
	router: appRouter,
	playgroundEndpoint: '/play',
	trpcApiEndpoint: '',
	polling: { enable: false },
})

const schema = await config.resolveTypes(appRouter)
const htmlPlaygroundPage = renderPlaygroundPage({ ...config.renderOptions, clientConfig: config })

writeFileSync(
	'src/playground.js',
	[
		`export const playgroundRouterSchema = ${JSON.stringify(schema)}`,
		`export const htmlPlaygroundPage = ${JSON.stringify(htmlPlaygroundPage)}`,
	].join('\n'),
	'utf8',
)

esbuild.build({
	entryPoints: ['src/index.ts'],
	bundle: true,
	format: 'esm',
	outfile: 'dist/worker.js',
	target: 'chrome96',
	minify: true,
	plugins: [
		// ignore node builtins used in trpc
		ignorePlugin([
			{
				resourceRegExp: /http$/,
				contextRegExp: /node_modules\/@trpc\/server.*/,
			},
			{
				resourceRegExp: /url$/,
				contextRegExp: /node_modules\/@trpc\/server.*/,
			},
			{
				resourceRegExp: /events$/,
				contextRegExp: /node_modules\/@trpc\/server.*/,
			},
		]),
	],
})
