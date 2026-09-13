import React from 'react';
import { DarsNizamiFrontSystem } from '../components/home/DarsNizamiFrontSystem';
import { IslamicToolsHub } from '../components/islamic/IslamicToolsHub';
import { HeroSection } from '../components/home/HeroSection';
import { QuickStats } from '../components/home/QuickStats';
import { FeatureGrid } from '../components/home/FeatureGrid';
import { ScreenshotsGallery } from '../components/gallery/ScreenshotsGallery';
import { InstallationGuide } from '../components/common/InstallationGuide';
import { DownloadButton } from '../components/common/DownloadButton';
import { APP_CONFIG } from '../config/appConfig';
import { HelpCircle, Sparkles } from 'lucide-react';
import { FAQ_DATA } from '../config/faqData';
import { useLanguage } from '../context/LanguageContext';

export const HomePage: React.FC = () => {
  const { language, isRtl, t } = useLanguage();

  return (
    <div className="space-y-0">
      {/* 1. Hero Showcase - Baytul Ilm AI Mobile App & APK Showcase (Top of Website) */}
      <HeroSection />

      {/* 2. Quick Key Stats */}
      <QuickStats />

      {/* 3. Dars-e-Nizami Front System (Darja Tabs & Instant Books) */}
      <DarsNizamiFrontSystem />

      {/* 4. Interactive Islamic Tools Hub (Quran, Duas, 99 Names, Asma-un-Nabi, Haramain Live, Qibla, Tasbeeh) */}
      <IslamicToolsHub />

      {/* 5. Core Features Grid */}
      <FeatureGrid />

      {/* 6. App Screenshots Gallery */}
      <ScreenshotsGallery />

      {/* 7. Installation Guide */}
      <InstallationGuide />

      {/* 7. FAQ Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200/80 dark:border-slate-800" dir={isRtl ? 'rtl' : 'ltr'}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              {language === 'ur' ? 'اکثر پوچھے جانے والے سوالات' : language === 'ps' ? 'ډېرې پوښتل کېدونکې پوښتنې (FAQs)' : 'Frequently Asked Questions'}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              {language === 'ur' 
                ? 'ایپ انسٹالیشن، سیکیورٹی اور خصوصیات سے متعلق سوالات کے جوابات'
                : language === 'ps'
                ? 'د اپلیکیشن د انسټالولو، امنیت او ځانګړتیاوو په اړه د پوښتنو ځوابونه'
                : 'Common questions regarding installation, security, and app features.'}
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_DATA.slice(0, 4).map((faq) => {
              const displayQuestion =
                language === 'ps' && faq.questionPashto
                  ? faq.questionPashto
                  : language === 'ur' && faq.questionUrdu
                  ? faq.questionUrdu
                  : faq.question;

              const displayAnswer =
                language === 'ps' && faq.answerPashto
                  ? faq.answerPashto
                  : language === 'ur' && faq.answerUrdu
                  ? faq.answerUrdu
                  : faq.answer;

              return (
                <div
                  key={faq.id}
                  className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2"
                >
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                    <span>{displayQuestion}</span>
                  </h3>
                  <p className={`text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed ${isRtl ? 'pr-6' : 'pl-6'}`}>
                    {displayAnswer}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Final Download Banner */}
      <section className="py-20 bg-gradient-to-r from-emerald-950 via-slate-950 to-teal-950 text-white border-t border-emerald-900/60 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/90 text-emerald-200 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Baytul Ilm AI - Version {APP_CONFIG.version}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('downloadLatestApk')}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed" dir={isRtl ? 'rtl' : 'ltr'}>
            {language === 'ur'
              ? 'قرآن مجید، مسنون دعائیں، 99 اسماء الحسنیٰ، اسماء النبی ﷺ، حرمین لائیو، قبلہ کمپاس، ڈیجیٹل تسبیح اور 8 سالہ درسِ نظامی نصاب اپنے موبائل میں حاصل کریں۔'
              : language === 'ps'
              ? 'قرآن کریم، مسنونې دعاګانې، د الله تعالی ۹۹ مبارک نومونه، حرمین شریفین ژوندۍ خپرونې، د قبلې قطب نما، ډیجیټل تسبېح او د درسِ نظامي بشپړ نصاب په خپل مبایل کښې ترلاسه کړئ.'
              : 'Access the Holy Quran, Masnoon Duas, 99 Names of Allah, Haramain Live, Qibla Compass, Digital Tasbeeh, and Dars-e-Nizami curriculum on your Android device.'}
          </p>

          <div className="pt-2 flex justify-center">
            <DownloadButton variant="hero" size="lg" showDetails />
          </div>
        </div>
      </section>
    </div>
  );
};

