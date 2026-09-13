import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { FeaturesPage } from './pages/FeaturesPage';
import { LibraryPage } from './pages/LibraryPage';
import { ScreenshotsPage } from './pages/ScreenshotsPage';
import { DownloadPage } from './pages/DownloadPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { LanguageProvider } from './context/LanguageContext';

// Scroll to top or anchor target on route navigation
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-white">
          {/* Responsive Fixed Navigation Header */}
          <Navbar />

          {/* Dynamic Page Router Views */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/screenshots" element={<ScreenshotsPage />} />
              <Route path="/download" element={<DownloadPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* In-page Anchor & Tool aliases to prevent 404s */}
              <Route path="/islamic-tools" element={<HomePage />} />
              <Route path="/installation-guide" element={<HomePage />} />
              <Route path="/tools" element={<HomePage />} />
              <Route path="/books" element={<Navigate to="/library" replace />} />
              <Route path="/dars-e-nizami-books" element={<Navigate to="/library" replace />} />
              <Route path="/apk" element={<Navigate to="/download" replace />} />

              {/* Legacy route redirects to keep links valid */}
              <Route path="/about" element={<Navigate to="/" replace />} />
              <Route path="/dars-e-nizami" element={<Navigate to="/library" replace />} />
              <Route path="/quiz-system" element={<Navigate to="/features" replace />} />
              <Route path="/ai-assistant" element={<Navigate to="/features" replace />} />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

