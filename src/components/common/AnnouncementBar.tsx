import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { Sparkles, ArrowRight, X } from 'lucide-react';

interface Props {
  onNavigate: (route: string) => void;
}

export const AnnouncementBar: React.FC<Props> = ({ onNavigate }) => {
  const { websiteConfig } = usePlatform();
  const [dismissed, setDismissed] = useState(false);

  if (!websiteConfig.announcement.visible || dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white text-xs sm:text-sm py-2 px-4 shadow-sm relative z-40 border-b border-blue-800/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 mx-auto sm:mx-0 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-medium tracking-wide truncate">
            {websiteConfig.announcement.text}
          </span>
          {websiteConfig.announcement.linkText && (
            <button
              onClick={() => onNavigate(websiteConfig.announcement.linkUrl)}
              className="inline-flex items-center gap-1 font-semibold text-blue-300 hover:text-white underline underline-offset-2 ml-1 text-xs shrink-0 cursor-pointer"
            >
              {websiteConfig.announcement.linkText}
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-blue-300 hover:text-white transition-colors p-1 rounded-md shrink-0 cursor-pointer"
          title="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
