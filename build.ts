import esbuild from 'esbuild'
import ignorePlugin from 'esbuild-plugin-ignore'

esbuild.build({
	entryPoints: ['src/index.ts'],
	bundle: true,
	format: 'esm',
	outfile: 'dist/worker.js',
	target: 'chrome96',
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
