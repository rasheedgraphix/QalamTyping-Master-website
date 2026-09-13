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

const existingBooksByYear: Record<string, any[]> = {
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
    if (!fs.existsSync(fullPath)) continue;
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

function generateReport() {
  const userBooks = parseMarkdownFiles();
  
  // Collect all existing URLs & titles
  const allExisting = new Map<string, any>();
  const allExistingUrls = new Map<string, any>();

  for (const [year, list] of Object.entries(existingBooksByYear)) {
    for (const b of list) {
      if (b.pdfUrl) {
        allExistingUrls.set(cleanUrl(b.pdfUrl), { ...b, yearInCode: year });
      }
      if (b.nameUrdu) {
        allExisting.set(normalizeText(b.nameUrdu), { ...b, yearInCode: year });
      }
      if (b.name) {
        allExisting.set(normalizeText(b.name), { ...b, yearInCode: year });
      }
    }
  }

  const results: Record<string, { totalUser: number; matched: number; missing: UserBook[] }> = {};
  const years = ['درجہ اولیٰ', 'درجہ ثانیہ', 'درجہ ثالثہ', 'درجہ رابعہ', 'درجہ خامسہ', 'درجہ سادسہ', 'درجہ سابعہ', 'دورہ حدیث'];

  for (const y of years) {
    results[y] = { totalUser: 0, matched: 0, missing: [] };
  }

  for (const ub of userBooks) {
    if (!results[ub.year]) {
      results[ub.year] = { totalUser: 0, matched: 0, missing: [] };
    }
    results[ub.year].totalUser++;

    const targetUrl = cleanUrl(ub.url);
    const targetNameNorm = normalizeText(ub.title);

    let match = allExistingUrls.get(targetUrl);
    if (!match) {
      // Check title
      for (const [existingNorm, obj] of allExisting.entries()) {
        if (existingNorm === targetNameNorm || 
            (targetNameNorm.length > 5 && existingNorm.includes(targetNameNorm)) || 
            (existingNorm.length > 5 && targetNameNorm.includes(existingNorm))) {
          match = obj;
          break;
        }
      }
    }

    if (match) {
      results[ub.year].matched++;
    } else {
      results[ub.year].missing.push(ub);
    }
  }

  let totalUser = 0;
  let totalMatched = 0;
  let totalMissing = 0;

  let reportMarkdown = '# تفصیلی تقابلی رپورٹ: کتب درسِ نظامی\n\n';
  reportMarkdown += 'یہ رپورٹ آپ کی فراہم کردہ مکمل فہرست اور ویب سائٹ کے موجودہ ڈیٹا بیس کے تقابل پر مبنی ہے۔\n\n';

  reportMarkdown += '### 📊 مجموعی خلاصہ (Overall Summary)\n\n';
  reportMarkdown += '| درجہ / سال | آپ کی فہرست میں تعداد | ویب سائٹ پر موجود | غیر موجود (Missing) | کیفیت |\n';
  reportMarkdown += '|:---|:---:|:---:|:---:|:---:|\n';

  for (const y of years) {
    const data = results[y];
    totalUser += data.totalUser;
    totalMatched += data.matched;
    totalMissing += data.missing.length;
    const status = data.missing.length === 0 ? '✅ تمام کتب موجود ہیں' : `⚠️ ${data.missing.length} کتب کی کمی ہے`;
    reportMarkdown += `| **${y}** | ${data.totalUser} | ${data.matched} | ${data.missing.length} | ${status} |\n`;
  }

  reportMarkdown += `| **کل میزان (Total)** | **${totalUser}** | **${totalMatched}** | **${totalMissing}** | ${totalMissing === 0 ? '✅ مکمل' : `⚠️ ${totalMissing} کتب باقی`} |\n\n`;

  reportMarkdown += '---\n\n';

  // Details for years that have missing books
  for (const y of years) {
    const data = results[y];
    if (data.missing.length > 0) {
      reportMarkdown += `### ❌ ${y}: غیر موجود کتب کی تفصیل (${data.missing.length} کتب)\n\n`;
      reportMarkdown += '| نمبر | کتاب کا نام | مضمون | مصنف / شارح |\n';
      reportMarkdown += '|:---:|:---|:---|:---|\n';
      for (const m of data.missing) {
        reportMarkdown += `| ${m.num} | ${m.title} | ${m.subject} | ${m.author} |\n`;
      }
      reportMarkdown += '\n';
    } else {
      reportMarkdown += `### ✅ ${y}: تمام کتب موجود ہیں (${data.matched} / ${data.totalUser})\n\n`;
    }
  }

  fs.writeFileSync(path.resolve(process.cwd(), 'scripts/comparison_report.md'), reportMarkdown);
  console.log(`Report generated successfully! Total user: ${totalUser}, Matched: ${totalMatched}, Missing: ${totalMissing}`);
}

generateReport();
