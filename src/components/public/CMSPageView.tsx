import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { FileText, Calendar, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface Props {
  slug: string;
  onBack: () => void;
  onOpenRFQModal: () => void;
}

export const CMSPageView: React.FC<Props> = ({ slug, onBack, onOpenRFQModal }) => {
  const { cmsPages } = usePlatform();

  const page = cmsPages.find(p => p.slug === slug) || cmsPages[0];

  if (!page) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">Page Not Found</h2>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold">
          ← Back to Home
        </button>
      </div>
    );
  }

  // Simple markdown renderer for headers, lists, paragraphs
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('# ')) {
        return <h1 key={idx} className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-6 mb-4">{line.replace('# ', '')}</h1>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={idx} className="text-lg font-bold text-slate-800 mt-5 mb-2">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('- ')) {
        return (
          <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 my-1 ml-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{line.replace('- ', '')}</span>
          </li>
        );
      }
      if (line.trim().length === 0) {
        return <div key={idx} className="h-2" />;
      }
      return <p key={idx} className="text-xs sm:text-sm text-slate-600 leading-relaxed my-2">{line}</p>;
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <article className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-10 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
              BD-Industrial Institutional Knowledge
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {page.title}
            </h1>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Last updated: {new Date(page.updatedAt).toLocaleDateString('en-GB')}</span>
            </div>
          </div>

          <div className="prose max-w-none">
            {renderFormattedContent(page.content)}
          </div>

          <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Need technical assistance or on-site factory verification?
            </div>
            <button
              onClick={onOpenRFQModal}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Post Custom RFQ
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};
