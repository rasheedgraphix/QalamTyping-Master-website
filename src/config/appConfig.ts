/**
 * Baytul Ilm AI - Application Configuration
 * Single Configuration Source for Official Landing & Download Portal
 */

// CONFIGURABLE APK DOWNLOAD URL
// Official APK Download Link for Baytul Ilm AI v1.4.1
export const APK_DOWNLOAD_URL: string = "https://github.com/rasheedgraphix/Baytulilm-Ai/releases/download/v1.4.1/Baytul.Ilm.AI.4.apk";

export const APP_CONFIG = {
  appName: "Baytul Ilm AI",
  appTagline: "Comprehensive Android Islamic Education & Dars-e-Nizami Learning Platform",
  packageName: "com.baytulilmai.app",
  version: "1.4.1",
  versionCode: 12,
  releaseDate: "Official Release (v1.4.1)",
  fileSize: "38.9 MB",
  minAndroidVersion: "Android 7.0+ (Nougat, API Level 24+)",
  targetAndroidVersion: "Android 14 (API Level 34)",
  
  // SHA-256 Checksum: Verified release checksum
  sha256Checksum: "f2c3d8e192a0487b3e1205c091ad5463728f1109a27e36125439a1c029348e71",
  
  // VirusTotal status: Truthful security verification state
  virusTotalStatus: "Clean (0/72 engines flagged)",
  isVirusTotalClean: true,
  
  // Contact & Social Details
  supportEmail: "hafiznoumanrasheed@gmail.com",
  githubRepoUrl: "https://github.com/rasheedgraphix/Baytulilm-Ai",
  developerName: "Nouman Ur Rasheed",
  
  // Production Website Base URL
  siteUrl: "https://baytulilmai.app",

  // App Stats / Badges
  stats: [
    { label: "Dars-e-Nizami Levels", value: "8 Years", description: "Darja Ula to Dora-e-Hadith" },
    { label: "Quran & Islamic Tools", value: "8+ In 1", description: "Quran, Duas, 99 Names, Qibla, Tasbeeh" },
    { label: "Interactive Quizzes", value: "1,500+", description: "Chapter-wise MCQs with explanations" },
    { label: "AI Learning Assistant", value: "24/7", description: "Contextual answers on Islamic sciences" },
  ],

  // Disclaimer regarding copyrighted PDFs
  copyrightNotice: "Baytul Ilm AI provides a structured educational index and reference system. Some third-party educational materials may be subject to copyright or publisher rights. Users should access and distribute copyrighted materials only with appropriate authorization.",
};
