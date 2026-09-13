import React, { useState } from 'react';
import { DarsNizamiBookItem } from '../../types';
import { getAuthenticBookCover } from '../../data/bookCoverRegistry';

interface BookCoverProps {
  book: DarsNizamiBookItem;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BookCover: React.FC<BookCoverProps> = ({ book, size = 'md', className = '' }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Resolve authentic verified cover URL for this exact book
  const resolvedCoverUrl = React.useMemo(() => {
    return getAuthenticBookCover(
      book.id,
      book.name,
      book.nameUrdu,
      book.pdfUrl,
      book.coverUrl
    );
  }, [book.id, book.name, book.nameUrdu, book.pdfUrl, book.coverUrl]);

  // Dimensions based on size
  const sizeClasses = {
    sm: 'w-20 h-28 text-[8px]',
    md: 'w-28 sm:w-32 h-40 sm:h-44 text-[10px]',
    lg: 'w-48 sm:w-56 h-68 sm:h-76 text-xs',
  }[size];

  // Leather and publisher theme tailored to subject
  const theme = React.useMemo(() => {
    const cat = (book.category || '').toLowerCase();
    
    // Hadith: Royal Burgundy & Gold
    if (cat.includes('hadith') || cat.includes('حدیث')) {
      return {
        bg: 'from-[#420914] via-[#2d050c] to-[#160205]',
        accent: '#f59e0b',
        border: 'border-amber-400/80',
        innerBorder: 'border-amber-400/40',
        titleGrad: 'from-amber-100 via-amber-200 to-amber-400',
        ribbon: 'bg-amber-500',
        categoryUrdu: 'علمِ حدیث',
        publisher: 'دار الکتب العلمیہ',
      };
    }
    
    // Tafseer: Deep Charcoal & Gold
    if (cat.includes('tafseer') || cat.includes('تفسیر')) {
      return {
        bg: 'from-[#1c1917] via-[#12100e] to-[#080706]',
        accent: '#fbbf24',
        border: 'border-amber-400/80',
        innerBorder: 'border-amber-400/40',
        titleGrad: 'from-amber-50 via-amber-200 to-amber-400',
        ribbon: 'bg-emerald-600',
        categoryUrdu: 'علمِ تفسیر',
        publisher: 'مکتبۃ البشریٰ کراچی',
      };
    }
    
    // Nahw & Sarf: Royal Sapphire Blue & Gold
    if (cat.includes('nahw') || cat.includes('sarf') || cat.includes('نحو') || cat.includes('صرف')) {
      return {
        bg: 'from-[#0a2744] via-[#05182c] to-[#020c18]',
        accent: '#38bdf8',
        border: 'border-amber-400/80',
        innerBorder: 'border-amber-400/40',
        titleGrad: 'from-amber-100 via-amber-200 to-amber-400',
        ribbon: 'bg-amber-400',
        categoryUrdu: cat.includes('sarf') || cat.includes('صرف') ? 'علمِ صرف' : 'علمِ نحو',
        publisher: 'مکتبۃ البشریٰ کراچی',
      };
    }
    
    // Mantiq & Falsafa & Usul: Deep Peacock Teal & Gold
    if (cat.includes('mantiq') || cat.includes('falsafa') || cat.includes('usul') || cat.includes('منطق') || cat.includes('اصول')) {
      return {
        bg: 'from-[#0d2f35] via-[#081d21] to-[#030e10]',
        accent: '#2dd4bf',
        border: 'border-amber-400/80',
        innerBorder: 'border-amber-400/40',
        titleGrad: 'from-amber-100 via-amber-200 to-amber-400',
        ribbon: 'bg-rose-600',
        categoryUrdu: cat.includes('mantiq') || cat.includes('منطق') ? 'علمِ منطق' : 'اصولِ فقہ',
        publisher: 'مکتبہ امدادیہ ملتان',
      };
    }
    
    // Adab & Balaghat: Persian Bronze & Gold
    if (cat.includes('adab') || cat.includes('balaghat') || cat.includes('بلاغت') || cat.includes('ادب')) {
      return {
        bg: 'from-[#381608] via-[#240d04] to-[#120601]',
        accent: '#fb923c',
        border: 'border-amber-400/80',
        innerBorder: 'border-amber-400/40',
        titleGrad: 'from-amber-100 via-amber-200 to-amber-400',
        ribbon: 'bg-amber-500',
        categoryUrdu: cat.includes('balaghat') || cat.includes('بلاغت') ? 'علمِ بلاغت' : 'عربی ادب',
        publisher: 'قدیمی کتب خانہ کراچی',
      };
    }
    
    // Default Fiqh: Sacred Emerald Green & Gold
    return {
      bg: 'from-[#06331e] via-[#032214] to-[#01120a]',
      accent: '#fbbf24',
      border: 'border-amber-400/80',
      innerBorder: 'border-amber-400/40',
      titleGrad: 'from-amber-100 via-amber-200 to-amber-400',
      ribbon: 'bg-amber-400',
      categoryUrdu: 'فقہ حنفی',
      publisher: 'مکتبۃ البشریٰ کراچی',
    };
  }, [book.category]);

  const hasPhotoCover = Boolean(resolvedCoverUrl && !imageError);

  return (
    <div
      className={`relative select-none shrink-0 group/cover rounded-r-lg rounded-l-[4px] shadow-xl transition-all duration-300 transform group-hover:scale-[1.02] group-hover:-translate-y-1 ${sizeClasses} ${className}`}
      style={{ perspective: '900px' }}
    >
      {/* 3D Book Spine (Left Thickness & Book Crease) */}
      <div className="absolute top-0 left-0 bottom-0 w-2.5 sm:w-3 bg-gradient-to-r from-black/80 via-black/45 to-transparent z-30 rounded-l-[3px] pointer-events-none" />

      {/* 3D Book Page Edge (Right Edge Book Block Thickness) */}
      <div className="absolute top-1 -right-1 bottom-1 w-1.5 sm:w-2 bg-gradient-to-r from-amber-100/40 via-amber-50/60 to-slate-300/80 rounded-r-[2px] shadow-sm z-0 pointer-events-none border-y border-r border-slate-300/40" />

      {/* Main Cover Container */}
      <div className={`relative w-full h-full rounded-r-lg rounded-l-[3px] overflow-hidden ${hasPhotoCover ? 'bg-slate-900' : `bg-gradient-to-br ${theme.bg}`} border-t border-b border-r border-amber-500/50 border-l-2 border-l-black/70 shadow-inner flex flex-col justify-between p-2 text-center`}>
        
        {/* CASE 1: REAL PUBLISHED BOOK COVER IMAGE */}
        {resolvedCoverUrl && !imageError && (
          <div className="absolute inset-0 z-10 bg-slate-950">
            <img
              src={resolvedCoverUrl}
              alt={book.nameUrdu || book.name}
              className={`w-full h-full object-cover object-center transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
            {/* Spine Depth Shadow on Image */}
            <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-black/75 to-transparent pointer-events-none z-20" />
            {/* Subtle Realistic Book Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-20" />
          </div>
        )}

        {/* CASE 2: AUTHENTIC ISLAMIC PUBLISHER BOOK COVER (Shown when no image or loading) */}
        {(!resolvedCoverUrl || imageError || !imageLoaded) && (
          <>
            {/* Leather texture */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
              style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, #ffffff 10%, transparent 20%), radial-gradient(circle at 20% 80%, #000000 15%, transparent 20%)`,
                backgroundSize: '6px 6px',
              }}
            />

            {/* Outer Gold Foil Border with Corner Arabesques */}
            <div className={`absolute inset-1 sm:inset-1.5 border ${theme.border} rounded-r-md pointer-events-none flex flex-col justify-between p-0.5`}>
              <div className="flex justify-between items-start pointer-events-none">
                <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 opacity-90" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 2h7v2H4v5H2V2zm2 2v3h2V6h3V4H4z" />
                </svg>
                <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 opacity-90" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 2h-7v2h5v5h2V2zm-2 2v3h-2V6h-3V4h5z" />
                </svg>
              </div>
              <div className="flex justify-between items-end pointer-events-none">
                <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 opacity-90" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 22h7v-2H4v-5H2v7zm2-2v-3h2v1h3v2H4z" />
                </svg>
                <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 opacity-90" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 22h-7v-2h5v-5h2v7zm-2-2v-3h-2v1h-3v2h5z" />
                </svg>
              </div>
            </div>

            {/* Inner Gold Frame */}
            <div className={`absolute inset-2 sm:inset-2.5 border ${theme.innerBorder} rounded-[2px] pointer-events-none`} />

            {/* Spine Ribs */}
            <div className="absolute top-0 left-2 bottom-0 w-[1px] bg-amber-400/30 pointer-events-none" />
            <div className="absolute top-1/4 left-0 w-2 h-[1px] bg-amber-400/40 pointer-events-none" />
            <div className="absolute top-2/4 left-0 w-2 h-[1px] bg-amber-400/40 pointer-events-none" />
            <div className="absolute top-3/4 left-0 w-2 h-[1px] bg-amber-400/40 pointer-events-none" />

            {/* Top Header: Bismillah & Class Badge */}
            <div className="relative z-20 pt-1 px-1">
              <div className="text-[7px] sm:text-[8px] text-amber-300/90 font-arabic tracking-wide leading-tight truncate drop-shadow-sm" dir="rtl">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>
              <div className="mt-0.5 inline-block px-1.5 py-0.5 rounded text-[7px] sm:text-[8px] font-bold text-amber-300 font-urdu border border-amber-400/40 bg-black/40 shadow-sm max-w-[95%] truncate">
                {book.classNameUrdu}
              </div>
            </div>

            {/* Center: Medallion Framing Book Title */}
            <div className="relative z-20 my-auto py-1 px-1 flex flex-col items-center justify-center">
              <div className="w-full relative py-2 px-1 border border-amber-400/30 rounded-lg bg-black/35 backdrop-blur-[0.5px] shadow-inner flex flex-col items-center">
                <div className="text-amber-400/80 mb-1 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400">
                    <path d="M12 2l2.4 4.8 5.3.8-3.8 3.7.9 5.3-4.8-2.5-4.8 2.5.9-5.3-3.8-3.7 5.3-.8L12 2z" />
                  </svg>
                </div>

                <h4
                  className={`font-black leading-tight text-transparent bg-clip-text bg-gradient-to-b ${theme.titleGrad} drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] font-urdu tracking-tight px-1 line-clamp-3 ${
                    size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-base sm:text-lg' : 'text-xs sm:text-[13px]'
                  }`}
                  dir="rtl"
                  title={book.nameUrdu || book.name}
                >
                  {book.nameUrdu || book.name}
                </h4>

                <div className="mt-1.5 inline-flex items-center gap-1">
                  <span className="text-[7px] sm:text-[8px] font-bold text-amber-300 font-urdu px-1.5 py-0.5 rounded bg-amber-950/70 border border-amber-400/40 shadow-sm">
                    {book.typeUrdu || book.type}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Footer: Category & Authentic Publisher Stamp */}
            <div className="relative z-20 pb-1 px-1">
              <div className="flex items-center justify-center gap-1 text-[7px] sm:text-[8px] text-amber-300/90 font-medium truncate">
                <span className="font-urdu font-semibold">{theme.categoryUrdu}</span>
                <span>•</span>
                <span className="font-urdu">{theme.publisher}</span>
              </div>
            </div>

            {/* Silk Bookmark Ribbon */}
            <div
              className={`absolute -bottom-2 right-3 w-2.5 h-4 ${theme.ribbon} shadow-md z-30 transform -rotate-3`}
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%)' }}
            />
          </>
        )}
      </div>
    </div>
  );
};
