import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  GraduationCap,
  Sparkles,
  Layers,
  X,
  Eye,
  CheckCircle2,
  BookMarked,
  Download,
  Share2
} from 'lucide-react';
import { ALL_DARS_NIZAMI_BOOKS, DARS_YEARS_META, DarsYearMeta } from '../../data/darsNizamiBooks';
import { DarsNizamiBookItem } from '../../types';
import { BookCard } from '../library/BookCard';
import { PdfModal } from '../library/PdfModal';
import { IslamicPatternBg } from '../layout/IslamicPatternBg';
import { useLanguage } from '../../context/LanguageContext';

export const DarsNizamiFrontSystem: React.FC = () => {
  const { language, isRtl } = useLanguage();

  // Active Darja Tab (Default to '1st' year so books are immediately visible at the front!)
  const [activeTab, setActiveTab] = useState<string>('1st');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [previewBook, setPreviewBook] = useState<DarsNizamiBookItem | null>(null);

  // Active Darja metadata
  const activeDarjaMeta = useMemo(() => {
    if (activeTab === 'all') return null;
    return DARS_YEARS_META.find((y) => y.classLevel === activeTab) || null;
  }, [activeTab]);

  // Books filtered by active tab, type, and search query
  const displayedBooks = useMemo(() => {
    return ALL_DARS_NIZAMI_BOOKS.filter((book) => {
      // 1. Darja Tab filter
      if (activeTab !== 'all' && book.classLevel !== activeTab) {
        return false;
      }

      // 2. Type filter
      if (selectedType !== 'all') {
        if (selectedType === 'main' && !book.type.includes('Main') && !book.typeUrdu.includes('اصل')) {
          return false;
        }
        if (selectedType === 'sharh' && !book.type.includes('Sharh') && !book.typeUrdu.includes('شرح')) {
          return false;
        }
        if (selectedType === 'translation' && !book.type.includes('Translation') && !book.typeUrdu.includes('ترجمہ')) {
          return false;
        }
        if (selectedType === 'notes' && !book.type.includes('Darsi') && !book.typeUrdu.includes('تقریر')) {
          return false;
        }
      }

      // 3. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = book.name.toLowerCase().includes(q);
        const matchNameUrdu = book.nameUrdu.toLowerCase().includes(q);
        const matchCategory = book.category.toLowerCase().includes(q);
        const matchClass = book.classNameUrdu.toLowerCase().includes(q);
        if (!matchName && !matchNameUrdu && !matchCategory && !matchClass) {
          return false;
        }
      }

      return true;
    });
  }, [activeTab, selectedType, searchQuery]);

  // When changing tab, reset sub-filters
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSelectedType('all');
  };

  return (
    <section id="dars-e-nizami-portal" className="relative pt-24 sm:pt-28 pb-16 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100" dir="rtl">
      {/* Radiant Islamic Top Ambient Background */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-emerald-950 via-teal-950 to-slate-950 text-white overflow-hidden pointer-events-none">
        <IslamicPatternBg variant="hero" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-10 right-10 w-[350px] h-[300px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* =========================================================================
            1. PREMIER CALLIGRAPHIC HEADER (Right at the Front)
            ========================================================================= */}
        <div className="text-center space-y-4 pt-4 sm:pt-6">
          {/* Bismillah */}
          <div className="flex items-center justify-center">
            <span className="font-arabic text-xl sm:text-2xl md:text-3xl text-amber-300 font-serif tracking-widest drop-shadow">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/90 text-amber-300 border border-amber-400/40 shadow-lg text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span className="font-urdu">درسِ نظامی ڈیجیٹل کتب خانہ • سال اول تا دورۂ حدیث شریف</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-urdu tracking-tight leading-tight drop-shadow-md">
            جامع نظامِ نصاب درسِ نظامی و شروحات
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-sm sm:text-base text-emerald-100/90 font-urdu leading-relaxed px-2">
            کسی بھی درجہ پر کلک کریں اور اس درجہ کی تمام اصل درسی کتب، مستند عربی و اردو شروحات، حواشی اور تراجم فوری طور پر آن لائن پڑھیں یا براہ راست PDF ڈاؤن لوڈ کریں۔
          </p>

          {/* Quick Real-Time Search Bar */}
          <div className="max-w-2xl mx-auto pt-2">
            <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/90 dark:border-slate-800 p-1.5 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
              <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="تمام کتب میں سے تلاش کریں... (مثلاً: قدوری، نحو میر، ہدایہ، کافیہ، مشکوٰۃ، جلالین)"
                className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none px-2 font-urdu"
                dir="rtl"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  title="تلاش ختم کریں"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. THE DARJA TABS ("pehle her her derje ka tab ho")
            ========================================================================= */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 font-urdu">
                درجاتِ درسِ نظامی (تمام کلاسز)
              </h2>
            </div>
            <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-300 dark:border-emerald-800">
              کل کتب: {ALL_DARS_NIZAMI_BOOKS.length}
            </span>
          </div>

          {/* Horizontal Scrollable Tabs Strip */}
          <div className="relative">
            <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-emerald-600/30">
              {/* Tab: All Books */}
              <button
                onClick={() => handleTabChange('all')}
                className={`shrink-0 px-4 py-3 rounded-2xl font-urdu font-bold text-xs sm:text-sm transition-all duration-200 flex flex-col items-center justify-center gap-0.5 min-w-[100px] border shadow-sm ${
                  activeTab === 'all'
                    ? 'bg-gradient-to-r from-emerald-700 to-teal-800 text-white border-emerald-500 shadow-md scale-[1.02] ring-2 ring-amber-400/50'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-emerald-50/60 dark:hover:bg-slate-800/80'
                }`}
              >
                <span>تمام درجات</span>
                <span className={`text-[10px] font-normal ${activeTab === 'all' ? 'text-amber-300' : 'text-slate-400'}`}>
                  {ALL_DARS_NIZAMI_BOOKS.length} کتب
                </span>
              </button>

              {/* Individual Tabs for Each Darja (1st through 8th Year) */}
              {DARS_YEARS_META.map((darja) => {
                const isActive = activeTab === darja.classLevel;
                return (
                  <button
                    key={darja.id}
                    onClick={() => handleTabChange(darja.classLevel)}
                    className={`shrink-0 px-4 py-3 rounded-2xl font-urdu font-bold text-xs sm:text-sm transition-all duration-200 flex flex-col items-center justify-center gap-0.5 min-w-[125px] sm:min-w-[140px] border shadow-sm ${
                      isActive
                        ? 'bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 text-white border-amber-400 shadow-lg scale-[1.02] ring-2 ring-amber-400/60'
                        : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-emerald-400/60 hover:bg-emerald-50/50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-sm sm:text-base font-black truncate max-w-[150px]">
                      {darja.badge}
                    </span>
                    <span
                      className={`text-[11px] font-medium truncate max-w-[150px] ${
                        isActive ? 'text-amber-300' : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {darja.nameUrdu.split('(')[0].trim()}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.2 rounded-full mt-0.5 ${
                        isActive
                          ? 'bg-amber-400 text-slate-950 font-extrabold'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {darja.totalBooks} کتب
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* =========================================================================
            3. ACTIVE DARJA INFORMATION BANNER & SUBJECT PILLS
            ========================================================================= */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-extrabold bg-amber-400 text-slate-950 font-urdu">
                  {activeDarjaMeta ? activeDarjaMeta.badge : 'تمام درجات'}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100 font-urdu">
                  {activeDarjaMeta ? activeDarjaMeta.nameUrdu : 'مکمل نصاب درسِ نظامی (تمام کتب)'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-urdu mt-1">
                {activeDarjaMeta
                  ? `مضامین و فنون: ${activeDarjaMeta.descriptionUrdu}`
                  : 'سال اول (اولیٰ) سے سال ہشتم (دورۂ حدیث شریف) تک تمام نصابی کتب و شروحات'}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              {/* Type Switcher */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl text-xs font-urdu font-bold">
                <button
                  onClick={() => setSelectedType('all')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    selectedType === 'all'
                      ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  تمام کتب
                </button>
                <button
                  onClick={() => setSelectedType('main')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    selectedType === 'main'
                      ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  اصل کتب
                </button>
                <button
                  onClick={() => setSelectedType('sharh')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    selectedType === 'sharh'
                      ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  شروحات و حواشی
                </button>
              </div>

              <span className="text-xs font-bold text-slate-600 dark:text-slate-400 font-urdu">
                نمایاں: {displayedBooks.length}
              </span>

              {(selectedType !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedType('all');
                    setSearchQuery('');
                  }}
                  className="text-xs text-rose-600 dark:text-rose-400 font-bold hover:underline font-urdu"
                >
                  فلٹرز ختم کریں
                </button>
              )}
            </div>
          </div>
        </div>

        {/* =========================================================================
            4. THE BOOKS GRID ("jab koi os tab per click kere to oski books osko nazar aaye")
            ========================================================================= */}
        {displayedBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {displayedBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onSelectForView={(b) => setPreviewBook(b)}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-4">
            <BookMarked className="w-12 h-12 text-slate-400 mx-auto" />
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 font-urdu">
              کوئی کتاب نہیں ملی
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-urdu max-w-md mx-auto">
              آپ کے منتخب کردہ فلٹر یا تلاش کے الفاظ کے مطابق کوئی کتاب دستیاب نہیں ہے۔ برائے مہربانی تلاش کا لفظ تبدیل کریں یا تمام فلٹرز ختم کریں۔
            </p>
            <button
              onClick={() => {
                setSelectedType('all');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-emerald-700 hover:bg-emerald-800 text-white font-urdu"
            >
              تمام فلٹرز ختم کریں
            </button>
          </div>
        )}
      </div>

      {/* Embedded High-Fidelity Online PDF Reader Modal */}
      {previewBook && (
        <PdfModal book={previewBook} onClose={() => setPreviewBook(null)} />
      )}
    </section>
  );
};
