import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Article } from '../types/article';

interface HeroLeadProps {
  article: Article;
  onReadArticle: (id: string) => void;
}

export const HeroLead: React.FC<HeroLeadProps> = ({ article, onReadArticle }) => {
  return (
    <section className="border-b border-stone-200 bg-[#FAF8F5] pt-8 pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Curatorial Masthead Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-200/80 text-xs font-mono uppercase tracking-widest text-stone-500">
          <div className="flex items-center gap-2">
            <span>Vol. VIII</span>
            <span aria-hidden="true">·</span>
            <span>The Grand Travel Dispatch</span>
            <span aria-hidden="true">·</span>
            <span className="text-stone-700">10 Definitive Expeditions</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Special Longform Issue</span>
            <span aria-hidden="true">·</span>
            <span>Updated Autumn 2026</span>
          </div>
        </div>

        {/* Lead Story Feature Layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Narrative Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Clean Unboxed Metadata without pills */}
              <div className="flex items-center gap-2 text-xs font-medium text-amber-800 mb-3 tracking-wide uppercase">
                <span>Featured Expedition</span>
                <span aria-hidden="true">·</span>
                <span>{article.country}</span>
                <span aria-hidden="true">·</span>
                <span>{article.readTime}</span>
              </div>

              <h1 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-stone-900 leading-[1.12]">
                {article.title}
              </h1>

              <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
                {article.subtitle}
              </p>

              <blockquote className="mt-6 pl-4 border-l-2 border-amber-800/60 italic font-serif-editorial text-stone-700 text-sm sm:text-base leading-snug">
                "{article.pullQuote}"
              </blockquote>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-stone-500">
                <span className="font-semibold text-stone-800">{article.author.name}</span>
                <span className="block mt-0.5">{article.author.role}</span>
              </div>

              <button
                onClick={() => onReadArticle(article.id)}
                className="group inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-all whitespace-nowrap shadow-sm hover:shadow"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Read Full Expedition</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Hero Visual Column */}
          <div className="lg:col-span-7">
            <div
              onClick={() => onReadArticle(article.id)}
              className="group cursor-pointer relative overflow-hidden rounded-lg border border-stone-200/90 shadow-md bg-stone-100 transition-all duration-300 hover:shadow-xl"
            >
              <div className="aspect-[16/9] w-full overflow-hidden bg-stone-200">
                <img
                  src={article.heroImage}
                  alt={article.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-3.5 bg-stone-900/95 text-stone-300 text-xs flex items-center justify-between">
                <span className="italic truncate pr-3">{article.imageCaption}</span>
                <span className="font-mono text-[11px] text-amber-300 shrink-0 uppercase tracking-wider">
                  Open Guide →
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
