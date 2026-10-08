import React from 'react';
import { Bookmark, ArrowUpRight } from 'lucide-react';
import { Article } from '../types/article';

interface ArticleCardProps {
  article: Article;
  onSelect: (id: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  index: number;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  isBookmarked,
  onToggleBookmark,
  index,
}) => {
  return (
    <article
      onClick={() => onSelect(article.id)}
      className="group cursor-pointer flex flex-col justify-between bg-white rounded-lg border border-stone-200/90 shadow-sm hover:shadow-md transition-all duration-300 hover:border-stone-300 overflow-hidden"
    >
      <div>
        {/* Visual Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
          <img
            src={article.heroImage}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />

          {/* Quiet Number Indicator */}
          <div className="absolute top-3 left-3 px-2 py-0.5 bg-stone-900/80 backdrop-blur-sm text-stone-200 font-mono text-[11px] rounded tracking-widest">
            {String(index + 1).padStart(2, '0')}
          </div>

          {/* Quick Bookmark Action */}
          <button
            onClick={(e) => onToggleBookmark(article.id, e)}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark expedition'}
            className="absolute top-3 right-3 p-1.5 rounded bg-white/90 backdrop-blur-sm text-stone-700 hover:text-amber-800 hover:bg-white shadow-xs transition-colors"
          >
            <Bookmark
              className={`w-4 h-4 ${isBookmarked ? 'fill-amber-800 text-amber-800' : 'text-stone-600'}`}
            />
          </button>
        </div>

        {/* Content Box */}
        <div className="p-5 sm:p-6">
          {/* Unboxed Metadata without pills */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2 font-medium tracking-wide">
            <span className="text-amber-800 font-semibold uppercase">{article.country}</span>
            <span aria-hidden="true">·</span>
            <span>{article.region}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{article.readTime}</span>
          </div>

          <h3 className="font-serif-editorial text-xl sm:text-2xl font-semibold text-stone-900 group-hover:text-amber-900 transition-colors leading-snug">
            {article.title}
          </h3>

          <p className="mt-2.5 text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
            {article.subtitle}
          </p>

          {/* Key Vibe & Duration Kicker */}
          <div className="mt-4 pt-3.5 border-t border-stone-100 text-xs text-stone-500 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-stone-400">Ideal Stay:</span>
              <span className="font-medium text-stone-700">{article.quickFacts.idealDuration}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-400">Atmosphere:</span>
              <span className="font-medium text-stone-700 truncate max-w-[180px]">
                {article.quickFacts.topVibe.split(',')[0]}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer Action */}
      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0">
        <div className="flex items-center justify-between text-xs font-semibold text-stone-800 group-hover:text-amber-800 transition-colors pt-3 border-t border-stone-100">
          <span>Read Expedition Guide</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </article>
  );
};
