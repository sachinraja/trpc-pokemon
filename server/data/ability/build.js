import path from 'node:path';
import { readJson, writeFormatted } from '../../scripts/utils.js';
export const buildAbilities = () => {
    const rawAbilities = readJson(path.join(__dirname, 'raw.json'));
    const abilities = rawAbilities.map((ability) => {
        return {
            id: ability.name,
            name: ability.ability_names[0].name,
            generation: ability.generation.id,
            flavorDescription: ability.flavor_text[0]?.description,
            effectShortDescription: ability.effect_texts[0]?.short_effect,
            effectLongDescription: ability.effect_texts[0]?.effect,
        };
    });
    writeFormatted({
        data: abilities,
        dirname: __dirname,
        exportName: 'abilities',
        type: 'Ability',
    });
};
