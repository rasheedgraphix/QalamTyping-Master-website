import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Language } from '../../translations/translations';

export const LanguageSwitcher: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'ur', label: 'اردو', flag: '🇵🇰' },
    { code: 'ps', label: 'پښتو', flag: '🇦🇫' },
    { code: 'en', label: 'English', flag: '🌐' },
  ];

  return (
    <div className={`inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 ${className}`}>
      <Globe className="w-3.5 h-3.5 text-slate-500 mx-1.5 shrink-0" />
      <div className="flex items-center gap-0.5">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              language === lang.code
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
            }`}
            aria-label={`Switch language to ${lang.label}`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
};
