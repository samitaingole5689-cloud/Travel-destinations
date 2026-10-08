import React from 'react';
import { Compass, ArrowUp } from 'lucide-react';
import { Article } from '../types/article';

interface FooterProps {
  articles: Article[];
  onSelectArticle: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ articles, onSelectArticle }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-stone-200 bg-stone-100/70 pt-14 pb-12 text-stone-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-stone-200">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-800" />
              <span className="font-display text-xl font-bold tracking-tight text-stone-900">
                Terra Incognita
              </span>
            </div>
            <p className="text-stone-500 leading-relaxed max-w-sm">
              An independent longform travel journal curating deep-dive cultural dispatches,
              architectural studies, and practical itineraries across the world's most enduring
              destinations.
            </p>
            <div className="pt-2 text-stone-400 font-mono text-[11px]">
              Published in Autumn 2026 · Volume VIII
            </div>
          </div>

          {/* Destination Index Column */}
          <div className="md:col-span-8">
            <h4 className="font-mono uppercase text-xs tracking-wider text-stone-900 font-semibold mb-4">
              Complete Expedition Index (10 Guides)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {articles.map((art, idx) => (
                <button
                  key={art.id}
                  onClick={() => {
                    onSelectArticle(art.id);
                    scrollToTop();
                  }}
                  className="text-left text-stone-600 hover:text-amber-900 transition-colors py-1 flex items-baseline gap-2 truncate group"
                >
                  <span className="font-mono text-stone-400 text-[11px] shrink-0">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <span className="truncate group-hover:underline">{art.destination}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Utility Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-400 text-[11px] font-mono">
          <div>
            © 2026 Terra Incognita Dispatch. All guides curated with editorial fidelity.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900 transition-colors"
          >
            <span>Back to Summit</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
