import fs from 'fs';
import path from 'path';
import { mergeClassBooks } from './mergeBooks';
import { DarsNizamiBookItem } from '../src/types';

const classes: {
  level: '1st' | '2nd' | '3rd' | '4th' | '5th' | '6th' | '7th' | '8th';
  file: string;
  varName: string;
}[] = [
  { level: '1st', file: 'darjaAwwal.ts', varName: 'DARJA_AWWAL_BOOKS' },
  { level: '2nd', file: 'darjaSania.ts', varName: 'DARJA_SANIA_BOOKS' },
  { level: '3rd', file: 'darjaSalisa.ts', varName: 'DARJA_SALISA_BOOKS' },
  { level: '4th', file: 'darjaRabia.ts', varName: 'DARJA_RABIA_BOOKS' },
  { level: '5th', file: 'darjaKhamisa.ts', varName: 'DARJA_KHAMISA_BOOKS' },
  { level: '6th', file: 'darjaSadisa.ts', varName: 'DARJA_SADISA_BOOKS' },
  { level: '7th', file: 'darjaSabea.ts', varName: 'DARJA_SABEA_BOOKS' },
  { level: '8th', file: 'doraeHadith.ts', varName: 'DORAE_HADITH_BOOKS' },
];

const targetDir = path.resolve('./src/data/darsNizamiBooks');

let totalAllBooks = 0;

for (const c of classes) {
  const merged = mergeClassBooks(c.level);
  totalAllBooks += merged.length;
  console.log(`Writing ${c.file} with ${merged.length} books...`);

  const fileContent = `import { DarsNizamiBookItem } from '../../types';

export const ${c.varName}: DarsNizamiBookItem[] = ${JSON.stringify(merged, null, 2)};
`;

  fs.writeFileSync(path.join(targetDir, c.file), fileContent, 'utf8');
}

console.log(`\nSuccessfully updated all 8 classes! Total books in curriculum: ${totalAllBooks}`);
