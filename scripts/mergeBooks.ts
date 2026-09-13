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
import { DarsNizamiBookItem } from '../src/types';

// Load all 5 parts
const p1 = JSON.parse(fs.readFileSync('./scripts/userCatalogPart1.json', 'utf8'));
const p2 = JSON.parse(fs.readFileSync('./scripts/userCatalogPart2.json', 'utf8'));
const p3 = JSON.parse(fs.readFileSync('./scripts/userCatalogPart3.json', 'utf8'));
const p4 = JSON.parse(fs.readFileSync('./scripts/userCatalogPart4.json', 'utf8'));
const p5 = JSON.parse(fs.readFileSync('./scripts/userCatalogPart5.json', 'utf8'));

interface RawUserBook {
  id?: string;
  title: string;
  author?: string;
  subject?: string;
  darja?: string;
  type?: string;
  pdfUrl: string;
}

const catalogs: Record<string, RawUserBook[]> = {
  '1st': p1.darjas[0].books,
  '2nd': p2.books,
  '3rd': p3[0].books,
  '4th': p3[1].books,
  '5th': p4[0].books,
  '6th': p4[1].books,
  '7th': p5[0].books,
  '8th': p5[1].books,
};

const currentLists: Record<string, DarsNizamiBookItem[]> = {
  '1st': DARJA_AWWAL_BOOKS,
  '2nd': DARJA_SANIA_BOOKS,
  '3rd': DARJA_SALISA_BOOKS,
  '4th': DARJA_RABIA_BOOKS,
  '5th': DARJA_KHAMISA_BOOKS,
  '6th': DARJA_SADISA_BOOKS,
  '7th': DARJA_SABEA_BOOKS,
  '8th': DORAE_HADITH_BOOKS,
};

const classMeta: Record<string, { classNameUrdu: string; classNameEnglish: string; idPrefix: string }> = {
  '1st': { classNameUrdu: 'درجہ اولیٰ (سال اول)', classNameEnglish: '1st Year (Darja Ula)', idPrefix: 'a-add' },
  '2nd': { classNameUrdu: 'درجہ ثانیہ (سال دوم)', classNameEnglish: '2nd Year (Darja Sania)', idPrefix: 's-add' },
  '3rd': { classNameUrdu: 'درجہ ثالثہ (سال سوم)', classNameEnglish: '3rd Year (Darja Salisa)', idPrefix: 'sl-add' },
  '4th': { classNameUrdu: 'درجہ رابعہ (سال چہارم)', classNameEnglish: '4th Year (Darja Rabia)', idPrefix: 'rb-add' },
  '5th': { classNameUrdu: 'درجہ خامسہ (سال پنجم)', classNameEnglish: '5th Year (Darja Khamisa)', idPrefix: 'kh-add' },
  '6th': { classNameUrdu: 'درجہ سادسہ (سال ششم)', classNameEnglish: '6th Year (Darja Sadisa)', idPrefix: 'sd-add' },
  '7th': { classNameUrdu: 'درجہ سابعہ (موقوف علیہ)', classNameEnglish: '7th Year (Darja Sabea / Mauqoof Alaih)', idPrefix: 'sb-add' },
  '8th': { classNameUrdu: 'دورۂ حدیث شریف (سال ہشتم)', classNameEnglish: '8th Year (Dora-e-Hadith Sharif)', idPrefix: 'dh-add' },
};

function mapSubjectToCategory(sub?: string): string {
  if (!sub) return 'General Islamic';
  const s = sub.trim();
  if (s.includes('فقہ') && !s.includes('اصول')) return 'Fiqh';
  if (s.includes('اصول فقہ')) return 'Usul al-Fiqh';
  if (s.includes('حدیث') && !s.includes('اصول') && !s.includes('دورہ')) return 'Hadith';
  if (s.includes('صحاح ستہ')) return 'Hadith (Sihah Sitta)';
  if (s.includes('شرح بخاری')) return 'Hadith (Sharh Bukhari)';
  if (s.includes('شرح مسلم')) return 'Hadith (Sharh Muslim)';
  if (s.includes('شرح ترمذی')) return 'Hadith (Sharh Tirmidhi)';
  if (s.includes('شرح ابی داود')) return 'Hadith (Sharh Abu Dawood)';
  if (s.includes('اصول حدیث')) return 'Usul al-Hadith';
  if (s.includes('تفسیر')) return 'Tafseer';
  if (s.includes('صرف')) return 'Sarf';
  if (s.includes('نحو')) return 'Nahw';
  if (s.includes('منطق')) return 'Mantiq';
  if (s.includes('فلسفہ')) return 'Falsafa';
  if (s.includes('بلاغت')) return 'Balaghat';
  if (s.includes('ادب') || s.includes('عربی ادب') || s.includes('شاعری')) return 'Arabic Literature';
  if (s.includes('انشاء')) return 'Insha';
  if (s.includes('تجوید')) return 'Tajweed';
  if (s.includes('عقائد')) return 'Aqaid & Kalam';
  if (s.includes('میراث') || s.includes('فرائض')) return 'Miras (Inheritance)';
  if (s.includes('فلکیات')) return 'Falkiyat';
  if (s.includes('تاریخ')) return 'Islamic History';
  if (s.includes('پرچہ') || s.includes('امتحان')) return 'Past Papers & Exams';
  return s;
}

function transliterateUrduToRoman(title: string): string {
  // Common clean romanizations for Dars-e-Nizami book titles
  let r = title
    .replace(/دروس القرآن/g, 'Duroos-ul-Quran')
    .replace(/پارہ عم/g, 'Para Amm')
    .replace(/پارہ 29/g, 'Para 29')
    .replace(/درسی تفسیر/g, 'Darsi Tafseer')
    .replace(/کشف الغم/g, 'Kashf-ul-Gham')
    .replace(/تفصیل الکتاب/g, 'Tafseel-ul-Kitab')
    .replace(/تدریس القرآن/g, 'Tadrees-ul-Quran')
    .replace(/زاد الطالبین/g, 'Zad-ul-Talibeen')
    .replace(/روضۃ الطالبین/g, 'Rozat-ut-Talibeen')
    .replace(/ارشاد الطالبین/g, 'Irshad-ul-Talibeen')
    .replace(/مختار الطالبین/g, 'Mukhtar-ut-Talibeen')
    .replace(/معین الطالبین/g, 'Moeen-ut-Talibeen')
    .replace(/حدائق الصالحین/g, 'Hadaiq-us-Saleheen')
    .replace(/إمداد الطالبین/g, 'Imdad-ul-Talibeen')
    .replace(/التسهيل الضروري/g, 'Al-Tasheel-uz-Zaroori')
    .replace(/الجوهرة النيرة/g, 'Al-Jauharat-un-Naiyyarah')
    .replace(/مختصر القدوري/g, 'Mukhtasar Al-Qudoori')
    .replace(/مختصر القدوری/g, 'Mukhtasar Al-Qudoori')
    .replace(/قدوری/g, 'Qudoori')
    .replace(/القدوری/g, 'Al-Qudoori')
    .replace(/اشرف النوری/g, 'Ashraf-ul-Noori')
    .replace(/التکمیل الضروری/g, 'Al-Takmeel-uz-Zaroori')
    .replace(/الحل الضروری/g, 'Al-Hal-uz-Zaroori')
    .replace(/علم الصیغہ/g, 'Ilm-us-Segha')
    .replace(/فصول اکبری/g, 'Fusool-e-Akbari')
    .replace(/خاصیات ابواب/g, 'Khasiyat-e-Abwab')
    .replace(/هداية النحو/g, 'Hidayat-un-Nahw')
    .replace(/ہدایة النحو/g, 'Hidayat-un-Nahw')
    .replace(/النحو الواضح/g, 'Al-Nahw-ul-Wazeh')
    .replace(/القراءات الراشدة/g, 'Al-Qiraat-ur-Rashidah')
    .replace(/القراءۃ الراشدۃ/g, 'Al-Qiraat-ur-Rashidah')
    .replace(/عیسیٰ غوجی/g, 'Eisa Ghoji')
    .replace(/ایساغوجی/g, 'Eisaghoji')
    .replace(/المرقاة/g, 'Al-Mirqat')
    .replace(/المرقاۃ/g, 'Al-Mirqat')
    .replace(/تيسير المنطق/g, 'Tayseer-ul-Mantiq')
    .replace(/تیسیر المنطق/g, 'Tayseer-ul-Mantiq')
    .replace(/معلم الإنشاء/g, 'Muallim-ul-Insha')
    .replace(/معلم الانشاء/g, 'Muallim-ul-Insha')
    .replace(/ریاض الصالحین/g, 'Riyad-us-Saliheen')
    .replace(/رياض الصالحين/g, 'Riyad-us-Saliheen')
    .replace(/کنز الدقائق/g, 'Kanz-ud-Daqaiq')
    .replace(/كنز الدقائق/g, 'Kanz-ud-Daqaiq')
    .replace(/الکافیة/g, 'Al-Kafiyah')
    .replace(/الكافية/g, 'Al-Kafiyah')
    .replace(/کافیہ/g, 'Kafiyah')
    .replace(/شرح التهذيب/g, 'Sharh-ut-Tahzeeb')
    .replace(/شرح التہذیب/g, 'Sharh-ut-Tahzeeb')
    .replace(/تهذيب المنطق/g, 'Tahzeeb-ul-Mantiq')
    .replace(/نفحة العرب/g, 'Nafhat-ul-Arab')
    .replace(/العقيدة الطحاوية/g, 'Al-Aqeedah-ut-Tahawiyyah')
    .replace(/العقیدۃ الطحاویہ/g, 'Al-Aqeedah-ut-Tahawiyyah')
    .replace(/شرح الوقاية/g, 'Sharh-ul-Wiqayah')
    .replace(/شرح الوقایہ/g, 'Sharh-ul-Wiqayah')
    .replace(/نور الانوار/g, 'Noor-ul-Anwar')
    .replace(/شرح جامی/g, 'Sharh Jami')
    .replace(/دروس البلاغة/g, 'Duroos-ul-Balagha')
    .replace(/مقامات الحريري/g, 'Maqamat-ul-Hariri')
    .replace(/القطبي/g, 'Al-Qutbi')
    .replace(/قطبی/g, 'Qutbi')
    .replace(/آثار السنن/g, 'Aasar-us-Sunan')
    .replace(/الہدایة/g, 'Al-Hidayah')
    .replace(/الہدایہ/g, 'Al-Hidayah')
    .replace(/منتخب الحسامی/g, 'Muntakhab-ul-Husami')
    .replace(/مختصر المعانی/g, 'Mukhtasar-ul-Maani')
    .replace(/الانتباہات المفيدة/g, 'Al-Intibahat-ul-Mufeeda')
    .replace(/المعلقات السبع/g, 'Al-Muallaqat-us-Saba')
    .replace(/مختارات من أدب العرب/g, 'Mukhtarat Min Adab-il-Arab')
    .replace(/تفسیر الجلالین/g, 'Tafseer-ul-Jalalain')
    .replace(/الفوز الکبیر/g, 'Al-Fawz-ul-Kabeer')
    .replace(/التوضیح والتلویح/g, 'Al-Tawzeeh Wat-Talweeh')
    .replace(/السراجی فی المیراث/g, 'Al-Siraji Fil-Meeras')
    .replace(/دیوان الحماسہ/g, 'Dewan-ul-Hamasah')
    .replace(/مشکوٰۃ المصابیح/g, 'Mishkat-ul-Masabeeh')
    .replace(/مرقاۃ المفاتیح/g, 'Mirqat-ul-Mafateeh')
    .replace(/مظاہر حق/g, 'Mazahir-e-Haq')
    .replace(/نخبۃ الفکر/g, 'Nukhbat-ul-Fikar')
    .replace(/تفسیر البیضاوی/g, 'Tafseer-ul-Baidawi')
    .replace(/صحیح البخاری/g, 'Sahih Al-Bukhari')
    .replace(/صحیح مسلم/g, 'Sahih Muslim')
    .replace(/جامع الترمذی/g, 'Sunan At-Tirmidhi')
    .replace(/سنن ابی داود/g, 'Sunan Abi Dawood')
    .replace(/سنن النسائی/g, 'Sunan An-Nasaee')
    .replace(/سنن ابن ماجہ/g, 'Sunan Ibn Majah')
    .replace(/مؤطا امام مالک/g, 'Muwatta Imam Malik')
    .replace(/مؤطا امام محمد/g, 'Muwatta Imam Muhammad')
    .replace(/شمائل الترمذی/g, 'Shamail-ut-Tirmidhi')
    .replace(/فتح الباری/g, 'Fath-ul-Bari')
    .replace(/عمدۃ القاری/g, 'Umdat-ul-Qari')
    .replace(/اردو شرح/g, 'Urdu Sharh')
    .replace(/عربی شرح/g, 'Arabic Sharh')
    .replace(/مکتبۃ البشریٰ/g, 'Al-Bushra')
    .replace(/رنگین/g, 'Color')
    .replace(/جلد اول/g, 'Vol 1')
    .replace(/جلد دوم/g, 'Vol 2')
    .replace(/جلد سوم/g, 'Vol 3')
    .replace(/جلد چہارم/g, 'Vol 4');

  // If still mostly non-ascii, keep title
  return r.trim();
}

function normalizeUrl(url: string): string {
  if (!url) return '';
  let u = url.trim().toLowerCase();
  u = u.replace(/^https?:\/\//, '').replace(/^www\./, '');
  return u;
}

function normalizeTitle(t: string): string {
  if (!t) return '';
  return t.replace(/[^\u0600-\u06FF\w]/g, '').toLowerCase();
}

export function mergeClassBooks(classLevel: '1st' | '2nd' | '3rd' | '4th' | '5th' | '6th' | '7th' | '8th'): DarsNizamiBookItem[] {
  const current = currentLists[classLevel] || [];
  const rawList = catalogs[classLevel] || [];
  const meta = classMeta[classLevel];

  const existingUrls = new Set<string>();
  const existingTitles = new Set<string>();

  for (const b of current) {
    if (b.pdfUrl) existingUrls.add(normalizeUrl(b.pdfUrl));
    if (b.nameUrdu) existingTitles.add(normalizeTitle(b.nameUrdu));
    if (b.name) existingTitles.add(normalizeTitle(b.name));
  }

  const merged: DarsNizamiBookItem[] = [...current];
  let addCount = 0;

  for (const r of rawList) {
    const normUrl = normalizeUrl(r.pdfUrl);
    const normTitle = normalizeTitle(r.title);

    if (normUrl && existingUrls.has(normUrl)) {
      continue;
    }
    if (normTitle && existingTitles.has(normTitle)) {
      continue;
    }

    addCount++;
    const englishName = transliterateUrduToRoman(r.title);
    const category = mapSubjectToCategory(r.subject);
    const type = r.type || 'Book';

    const newBook: DarsNizamiBookItem = {
      id: `${meta.idPrefix}-${addCount}`,
      name: englishName,
      nameUrdu: r.title,
      classLevel: classLevel,
      classNameUrdu: meta.classNameUrdu,
      classNameEnglish: meta.classNameEnglish,
      category: category,
      type: type,
      typeUrdu: r.type || 'کتاب',
      pdfUrl: r.pdfUrl,
      author: r.author || undefined,
    };

    existingUrls.add(normUrl);
    if (normTitle) existingTitles.add(normTitle);
    merged.push(newBook);
  }

  return merged;
}
