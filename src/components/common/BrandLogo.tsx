import React from 'react';

interface BrandLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  withGlow?: boolean;
}

const sizeMap = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-16 h-16',
  xl: 'w-20 h-20',
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  className = '',
  withGlow = false,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 aspect-square ${sizeMap[size]} ${className}`}
    >
      {withGlow && (
        <div className="absolute inset-0 bg-emerald-500/20 rounded-2xl blur-md -z-10 animate-pulse" />
      )}
      <svg
        viewBox="0 0 128 128"
        className="w-full h-full drop-shadow-md select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Baytul Ilm AI Official Logo"
        role="img"
      >
        <defs>
          <linearGradient id="blBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#064e3b" />
            <stop offset="50%" stopColor="#042f2e" />
            <stop offset="100%" stopColor="#021c1b" />
          </linearGradient>

          <linearGradient id="blGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="35%" stopColor="#fbbf24" />
            <stop offset="70%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          <linearGradient id="blAiSparkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>

          <filter id="blGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Base Squircle */}
        <rect
          x="4"
          y="4"
          width="120"
          height="120"
          rx="30"
          fill="url(#blBgGrad)"
          stroke="#10b981"
          strokeWidth="2"
          strokeOpacity="0.4"
        />

        {/* Inner Golden Ornamental Border */}
        <rect
          x="9"
          y="9"
          width="110"
          height="110"
          rx="25"
          fill="none"
          stroke="url(#blGoldGrad)"
          strokeWidth="1.2"
          strokeOpacity="0.6"
          strokeDasharray="8 4"
        />

        {/* Islamic Dome / Mihrab Arch Silhouette */}
        <path
          d="M64 22 C56 32, 32 46, 32 78 C32 94, 45 102, 64 102 C83 102, 96 94, 96 78 C96 46, 72 32, 64 22 Z"
          fill="#065f46"
          fillOpacity="0.4"
          stroke="url(#blGoldGrad)"
          strokeWidth="1.5"
          strokeOpacity="0.5"
        />

        {/* Open Book of Knowledge (Kitab / Quranic Pages) */}
        {/* Left Page */}
        <path
          d="M64 88 C54 84, 40 82, 30 87 C29 74, 30 58, 30 58 C40 54, 54 56, 64 62 Z"
          fill="url(#blGoldGrad)"
          fillOpacity="0.95"
        />
        <path
          d="M34 63 C43 60, 53 61, 60 66"
          stroke="#78350f"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M34 71 C43 68, 53 69, 60 74"
          stroke="#78350f"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M34 79 C43 76, 53 77, 60 82"
          stroke="#78350f"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Right Page */}
        <path
          d="M64 88 C74 84, 88 82, 98 87 C99 74, 98 58, 98 58 C88 54, 74 56, 64 62 Z"
          fill="url(#blGoldGrad)"
          fillOpacity="0.95"
        />
        <path
          d="M94 63 C85 60, 75 61, 68 66"
          stroke="#78350f"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M94 71 C85 68, 75 69, 68 74"
          stroke="#78350f"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M94 79 C85 76, 75 77, 68 82"
          stroke="#78350f"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Book Spine Center Rib */}
        <path
          d="M64 60 L64 92"
          stroke="#451a03"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Top AI Intelligence Node / 8-Pointed Islamic Star */}
        <g transform="translate(64, 38) scale(0.9)" filter="url(#blGlow)">
          <rect x="-9" y="-9" width="18" height="18" rx="2" fill="url(#blGoldGrad)" />
          <rect
            x="-9"
            y="-9"
            width="18" height="18"
            rx="2"
            fill="url(#blGoldGrad)"
            transform="rotate(45)"
          />
          <circle
            cx="0"
            cy="0"
            r="4.5"
            fill="#042f2e"
            stroke="url(#blAiSparkGrad)"
            strokeWidth="1.5"
          />
          <circle cx="0" cy="0" r="2" fill="#6ee7b7" />
        </g>

        {/* Constellation AI Neural Connection Sparks */}
        <circle cx="46" cy="46" r="1.8" fill="#6ee7b7" opacity="0.8" />
        <circle cx="82" cy="46" r="1.8" fill="#6ee7b7" opacity="0.8" />
        <path
          d="M48 46 L56 41"
          stroke="#6ee7b7"
          strokeWidth="0.8"
          strokeDasharray="1.5 1.5"
          opacity="0.6"
        />
        <path
          d="M80 46 L72 41"
          stroke="#6ee7b7"
          strokeWidth="0.8"
          strokeDasharray="1.5 1.5"
          opacity="0.6"
        />
      </svg>
    </div>
  );
};
