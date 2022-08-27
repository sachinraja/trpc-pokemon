import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
export const readJson = (path) => {
    const text = readFileSync(path, 'utf8');
    return JSON.parse(text);
};
export const writeFormatted = (opts) => {
    const stringified = JSON.stringify(opts.data);
    writeFileSync(path.join(opts.dirname, 'data.js'), `export const ${opts.exportName} = ${stringified}`, 'utf8');
    writeFileSync(path.join(opts.dirname, 'data.d.ts'), [
        `import { ${opts.type} } from '../../types'`,
        `export declare const ${opts.exportName}: ${opts.type}[]`,
    ].join('\n') + '\n', 'utf8');
};
