/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { ALL_ARTICLES, getArticleById } from './data/articles';
import { Navbar } from './components/Navbar';
import { HeroLead } from './components/HeroLead';
import { ArticleCard } from './components/ArticleCard';
import { ArticleReader } from './components/ArticleReader';
import { BookmarksModal } from './components/BookmarksModal';
import { Footer } from './components/Footer';
import { Compass, Filter, Search, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'terra_incognita_bookmarks';

export default function App() {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedTheme, setSelectedTheme] = useState('All');
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['bali', 'kyoto', 'switzerland'];
    } catch {
      return ['bali', 'kyoto', 'switzerland'];
    }
  });

  // Sync bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.warn('Could not persist bookmarks', e);
    }
  }, [bookmarkedIds]);

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filter articles based on search query, region, and theme
  const filteredArticles = useMemo(() => {
    return ALL_ARTICLES.filter((article) => {
      // Region filter
      if (selectedRegion === 'Europe' && article.region !== 'Europe') return false;
      if (selectedRegion === 'Asia' && !['Southeast Asia', 'East Asia', 'South Asia'].includes(article.region)) return false;
      if (selectedRegion === 'Americas & Middle East' && !['North America', 'Middle East'].includes(article.region)) return false;
      if (selectedRegion === 'Oceania' && article.region !== 'Oceania') return false;

      // Theme filter
      if (selectedTheme !== 'All' && article.theme !== selectedTheme) return false;

      // Search query filter (matches title, destination, country, food, attractions)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesBasic =
          article.title.toLowerCase().includes(q) ||
          article.destination.toLowerCase().includes(q) ||
          article.country.toLowerCase().includes(q) ||
          article.subtitle.toLowerCase().includes(q) ||
          article.theme.toLowerCase().includes(q);

        const matchesAttraction = article.majorAttractions.some(
          (a) => a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)
        );

        const matchesFood = article.foodToTry.some(
          (f) => f.dish.toLowerCase().includes(q) || (f.localName && f.localName.toLowerCase().includes(q))
        );

        if (!matchesBasic && !matchesAttraction && !matchesFood) return false;
      }

      return true;
    });
  }, [searchQuery, selectedRegion, selectedTheme]);

  const currentArticle = useMemo(() => {
    return selectedArticleId ? getArticleById(selectedArticleId) : null;
  }, [selectedArticleId]);

  // Lead story for the marquee (first article or selected feature)
  const leadArticle = ALL_ARTICLES[0]; // Bali

  const regionOptions = ['All', 'Europe', 'Asia', 'Americas & Middle East', 'Oceania'];

  const themeOptions = [
    'All',
    'Tropical',
    'Culture & Art',
    'Island & Coastal',
    'Alpine & Nature',
    'Heritage',
    'Metropolitan',
    'Luxury & Desert',
    'Adventure',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      {/* Top Bar Navigation */}
      <Navbar
        onSelectArticle={(id) => {
          setSelectedArticleId(id);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        selectedArticleId={selectedArticleId}
        bookmarkedIds={bookmarkedIds}
        articles={ALL_ARTICLES}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      />

      {/* Reader Mode vs. Catalog Mode */}
      {currentArticle ? (
        <ArticleReader
          article={currentArticle}
          onBack={() => {
            setSelectedArticleId(null);
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
          onSelectArticle={(id) => {
            setSelectedArticleId(id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          isBookmarked={bookmarkedIds.includes(currentArticle.id)}
          onToggleBookmark={(id) => toggleBookmark(id)}
        />
      ) : (
        <main className="flex-1">
          {/* Featured Lead Story Marquee (Only when no active search/region filter) */}
          {searchQuery === '' && selectedRegion === 'All' && selectedTheme === 'All' && (
            <HeroLead
              article={leadArticle}
              onReadArticle={(id) => {
                setSelectedArticleId(id);
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
            />
          )}

          {/* Catalog Filter & Collection Header */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-800 font-semibold mb-1.5">
                  <Compass className="w-4 h-4" />
                  <span>The Expedition Archive</span>
                </div>
                <h2 className="font-serif-editorial text-3xl sm:text-4xl font-medium text-stone-900">
                  Ten Definitive Travel Chronicles
                </h2>
                <p className="text-stone-600 text-sm mt-1 max-w-xl">
                  Exhaustive longform field guides covering cultural history, landmark attractions,
                  culinary treasures, seasonal timing, logistics, and transparent budgets.
                </p>
              </div>

              {/* Status and count */}
              <div className="text-xs font-mono text-stone-500">
                Displaying <span className="font-semibold text-stone-900">{filteredArticles.length}</span> of {ALL_ARTICLES.length} expeditions
              </div>
            </div>

            {/* Interactive Region Filter Buttons (Functional Tabs) */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/60 rounded-md">
                {regionOptions.map((region) => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                      selectedRegion === region
                        ? 'bg-white text-stone-950 font-semibold shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>

              {/* Theme Dropdown or Filter */}
              <div className="flex items-center gap-2 text-xs">
                <Filter className="w-3.5 h-3.5 text-stone-400" />
                <span className="text-stone-500 font-medium">Theme:</span>
                <select
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="bg-white border border-stone-200 text-stone-800 text-xs rounded px-2.5 py-1.5 focus:outline-none focus:border-stone-400"
                >
                  {themeOptions.map((t) => (
                    <option key={t} value={t}>
                      {t === 'All' ? 'All Themes' : t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Search Badge */}
            {searchQuery && (
              <div className="mt-4 flex items-center gap-2 text-xs text-stone-600">
                <span>Filtering by query:</span>
                <span className="font-semibold text-amber-900">"{searchQuery}"</span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-stone-400 hover:text-stone-700 underline text-[11px]"
                >
                  Clear search
                </button>
              </div>
            )}
          </section>

          {/* Article Grid Layout */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-lg border border-stone-200 p-8 my-6">
                <Search className="w-8 h-8 text-stone-300 mx-auto mb-3" />
                <h3 className="font-serif-editorial text-xl font-medium text-stone-800">
                  No matching expeditions found
                </h3>
                <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                  Try clearing your search query or switching regions to explore the complete catalog.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedRegion('All');
                    setSelectedTheme('All');
                  }}
                  className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredArticles.map((article, index) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    index={index}
                    onSelect={(id) => {
                      setSelectedArticleId(id);
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }}
                    isBookmarked={bookmarkedIds.includes(article.id)}
                    onToggleBookmark={toggleBookmark}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Curatorial Comparative Matrix Strip */}
          <section className="border-t border-stone-200 bg-stone-100/60 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <div className="text-xs font-mono uppercase tracking-widest text-amber-800 font-semibold mb-1">
                  Editorial Comparison
                </div>
                <h3 className="font-serif-editorial text-2xl sm:text-3xl font-medium text-stone-900">
                  Quick Expedition Matrix
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Compare recommended stays, currencies, and signature vibes across all ten destinations.
                </p>
              </div>

              <div className="bg-white rounded-lg border border-stone-200 overflow-x-auto shadow-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-stone-200 bg-stone-50/80 font-mono uppercase tracking-wider text-stone-500 text-[11px]">
                      <th className="py-3 px-4 font-semibold">Destination</th>
                      <th className="py-3 px-4 font-semibold">Region</th>
                      <th className="py-3 px-4 font-semibold">Recommended Stay</th>
                      <th className="py-3 px-4 font-semibold">Primary Currency</th>
                      <th className="py-3 px-4 font-semibold">Signature Vibe</th>
                      <th className="py-3 px-4 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-normal text-stone-700">
                    {ALL_ARTICLES.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-amber-50/40 transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedArticleId(item.id);
                          window.scrollTo({ top: 0, behavior: 'instant' });
                        }}
                      >
                        <td className="py-3.5 px-4 font-semibold text-stone-900 font-serif-editorial text-sm">
                          {item.destination}
                        </td>
                        <td className="py-3.5 px-4 text-stone-500">{item.country}</td>
                        <td className="py-3.5 px-4 font-mono">{item.quickFacts.idealDuration}</td>
                        <td className="py-3.5 px-4 font-mono">{item.quickFacts.currency.split('(')[0]}</td>
                        <td className="py-3.5 px-4 text-stone-600 truncate max-w-xs">
                          {item.quickFacts.topVibe.split(',')[0]}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span className="text-amber-800 font-semibold hover:underline">
                            Read Guide →
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Bookmarks Drawer Modal */}
      <BookmarksModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedIds={bookmarkedIds}
        articles={ALL_ARTICLES}
        onSelectArticle={(id) => {
          setSelectedArticleId(id);
          setIsBookmarksOpen(false);
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
        onRemoveBookmark={(id) => toggleBookmark(id)}
      />

      {/* Editorial Footer */}
      <Footer
        articles={ALL_ARTICLES}
        onSelectArticle={(id) => {
          setSelectedArticleId(id);
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
      />
    </div>
  );
}
