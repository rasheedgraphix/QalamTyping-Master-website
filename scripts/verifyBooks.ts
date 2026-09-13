import fs from 'fs';
import path from 'path';
import { DARJA_AWWAL_BOOKS } from '../src/data/darsNizamiBooks/darjaAwwal';
import { DARJA_SANIA_BOOKS } from '../src/data/darsNizamiBooks/darjaSania';
import { DARJA_SALISA_BOOKS } from '../src/data/darsNizamiBooks/darjaSalisa';
import { DARJA_RABIA_BOOKS } from '../src/data/darsNizamiBooks/darjaRabia';
import { DARJA_KHAMISA_BOOKS } from '../src/data/darsNizamiBooks/darjaKhamisa';
import { DARJA_SADISA_BOOKS } from '../src/data/darsNizamiBooks/darjaSadisa';
import { DARJA_SABEA_BOOKS } from '../src/data/darsNizamiBooks/darjaSabea';
import { DORAE_HADITH_BOOKS } from '../src/data/darsNizamiBooks/doraeHadith';

const existingBooksByYear: Record<string, typeof DARJA_AWWAL_BOOKS> = {
  'درجہ اولیٰ': DARJA_AWWAL_BOOKS,
  'درجہ ثانیہ': DARJA_SANIA_BOOKS,
  'درجہ ثالثہ': DARJA_SALISA_BOOKS,
  'درجہ رابعہ': DARJA_RABIA_BOOKS,
  'درجہ خامسہ': DARJA_KHAMISA_BOOKS,
  'درجہ سادسہ': DARJA_SADISA_BOOKS,
  'درجہ سابعہ': DARJA_SABEA_BOOKS,
  'دورہ حدیث': DORAE_HADITH_BOOKS,
};

interface UserBook {
  year: string;
  num: number;
  title: string;
  subject: string;
  author: string;
  url: string;
}

function parseMarkdownFiles(): UserBook[] {
  const books: UserBook[] = [];
  const files = [
    'scripts/userCatalogFull1.md',
    'scripts/userCatalogFull2.md',
    'scripts/userCatalogFull3.md',
    'scripts/userCatalogFull4.md',
    'scripts/userCatalogFull5.md',
  ];

  let currentYear = '';

  for (const file of files) {
    const fullPath = path.resolve(process.cwd(), file);
    if (!fs.existsSync(fullPath)) {
      console.log('File not found:', fullPath);
      continue;
    }
    const lines = fs.readFileSync(fullPath, 'utf-8').split('\n');

    for (const line of lines) {
      if (line.includes('درجہ اولیٰ') || line.includes('درجہ اول')) {
        currentYear = 'درجہ اولیٰ';
      } else if (line.includes('درجہ ثانیہ')) {
        currentYear = 'درجہ ثانیہ';
      } else if (line.includes('درجہ ثالثہ')) {
        currentYear = 'درجہ ثالثہ';
      } else if (line.includes('درجہ رابعہ')) {
        currentYear = 'درجہ رابعہ';
      } else if (line.includes('درجہ خامسہ')) {
        currentYear = 'درجہ خامسہ';
      } else if (line.includes('درجہ سادسہ')) {
        currentYear = 'درجہ سادسہ';
      } else if (line.includes('درجہ سابعہ')) {
        currentYear = 'درجہ سابعہ';
      } else if (line.includes('دورہ حدیث')) {
        currentYear = 'دورہ حدیث';
      }

      // Check if table row
      const match = line.match(/^\|\s*(\d+)\s*\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|\s*\[.*?\]\((.*?)\)\s*\|/);
      if (match) {
        const num = parseInt(match[1].trim(), 10);
        const title = match[2].trim();
        const subject = match[3].trim();
        const author = match[4].trim();
        const url = match[5].trim();

        books.push({
          year: currentYear,
          num,
          title,
          subject,
          author,
          url,
        });
      }
    }
  }

  return books;
}

function cleanUrl(url: string): string {
  try {
    const decoded = decodeURIComponent(url).trim().toLowerCase();
    // remove trailing slashes or spaces
    return decoded.replace(/\/$/, '');
  } catch {
    return url.trim().toLowerCase();
  }
}

function normalizeText(text: string): string {
  return text
    .replace(/[ـ\s\(\)\[\]،,۔\-–—_\/\\']/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/[ة]/g, 'ہ')
    .replace(/[يى]/g, 'ی')
    .replace(/[ك]/g, 'ک')
    .toLowerCase();
}

function main() {
  const userBooks = parseMarkdownFiles();
  console.log(`Total books parsed from user list: ${userBooks.length}`);

  // Count per year in user catalog
  const userCountsByYear: Record<string, number> = {};
  for (const b of userBooks) {
    userCountsByYear[b.year] = (userCountsByYear[b.year] || 0) + 1;
  }
  console.log('User books per year:', userCountsByYear);

  // Count existing in code
  const existingCountsByYear: Record<string, number> = {};
  let totalExisting = 0;
  for (const [year, list] of Object.entries(existingBooksByYear)) {
    existingCountsByYear[year] = list.length;
    totalExisting += list.length;
  }
  console.log('Existing books in code per year:', existingCountsByYear);
  console.log(`Total existing in code: ${totalExisting}`);

  // Check matching
  // We check by:
  // 1. exact/normalized pdfUrl match
  // 2. or normalized Urdu name match
  const missingByUserYear: Record<string, UserBook[]> = {};
  const matchedCountByYear: Record<string, number> = {};

  for (const [year, books] of Object.entries(existingBooksByYear)) {
    missingByUserYear[year] = [];
    matchedCountByYear[year] = 0;
  }

  // Also collect all existing URLs and names across all years
  const allExistingUrls = new Set<string>();
  const allExistingNames = new Set<string>();

  for (const list of Object.values(existingBooksByYear)) {
    for (const b of list) {
      if (b.pdfUrl) {
        allExistingUrls.add(cleanUrl(b.pdfUrl));
      }
      if (b.nameUrdu) {
        allExistingNames.add(normalizeText(b.nameUrdu));
      }
      if (b.name) {
        allExistingNames.add(normalizeText(b.name));
      }
    }
  }

  for (const ub of userBooks) {
    const list = existingBooksByYear[ub.year] || [];
    const targetUrl = cleanUrl(ub.url);
    const targetNameNorm = normalizeText(ub.title);

    // Try finding match in the same year first
    let found = list.some(b => {
      const bUrl = b.pdfUrl ? cleanUrl(b.pdfUrl) : '';
      if (bUrl && bUrl === targetUrl) return true;
      const bNameNorm = normalizeText(b.nameUrdu || '');
      if (bNameNorm && (bNameNorm.includes(targetNameNorm) || targetNameNorm.includes(bNameNorm))) return true;
      return false;
    });

    // If not found in same year, check globally
    if (!found) {
      if (allExistingUrls.has(targetUrl)) {
        found = true;
      } else {
        for (const name of allExistingNames) {
          if (name.includes(targetNameNorm) || targetNameNorm.includes(name)) {
            found = true;
            break;
          }
        }
      }
    }

    if (found) {
      matchedCountByYear[ub.year] = (matchedCountByYear[ub.year] || 0) + 1;
    } else {
      if (!missingByUserYear[ub.year]) missingByUserYear[ub.year] = [];
      missingByUserYear[ub.year].push(ub);
    }
  }

  console.log('\n--- MATCHING RESULTS ---');
  let totalMissing = 0;
  for (const [year, missing] of Object.entries(missingByUserYear)) {
    const matched = matchedCountByYear[year] || 0;
    const userTotal = userCountsByYear[year] || 0;
    console.log(`\n${year}: User catalog=${userTotal}, Matched=${matched}, Missing=${missing.length}`);
    totalMissing += missing.length;
    if (missing.length > 0) {
      console.log(`First 5 missing in ${year}:`);
      missing.slice(0, 5).forEach(m => {
        console.log(`  #${m.num}: ${m.title} (${m.url})`);
      });
    }
  }

  console.log(`\nTOTAL MISSING: ${totalMissing} out of ${userBooks.length}`);
}

main();
