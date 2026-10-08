import React, { useState } from 'react';
import { Search, Bookmark, Compass, X } from 'lucide-react';
import { Article } from '../types/article';

interface NavbarProps {
  onSelectArticle: (articleId: string | null) => void;
  selectedArticleId: string | null;
  bookmarkedIds: string[];
  articles: Article[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenBookmarks: () => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectArticle,
  selectedArticleId,
  bookmarkedIds,
  searchQuery,
  setSearchQuery,
  onOpenBookmarks,
  setSelectedRegion,
}) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Zone 1: Single text wordmark */}
          <button
            onClick={() => {
              onSelectArticle(null);
              setSelectedRegion('All');
            }}
            className="group flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 rounded-sm"
          >
            <Compass className="w-5 h-5 text-amber-800 transition-transform duration-300 group-hover:rotate-45" />
            <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-stone-900 group-hover:text-amber-900 transition-colors">
              Terra Incognita
            </span>
          </button>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
            <button
              onClick={() => {
                onSelectArticle(null);
                setSelectedRegion('All');
              }}
              className={`hover:text-stone-900 transition-colors ${!selectedArticleId ? 'text-stone-950 font-semibold' : ''}`}
            >
              All Expeditions
            </button>
            <button
              onClick={() => {
                onSelectArticle(null);
                setSelectedRegion('Europe');
              }}
              className="hover:text-stone-900 transition-colors"
            >
              Europe
            </button>
            <button
              onClick={() => {
                onSelectArticle(null);
                setSelectedRegion('Asia');
              }}
              className="hover:text-stone-900 transition-colors"
            >
              Asia & Pacific
            </button>
            <button
              onClick={() => {
                onSelectArticle(null);
                setSelectedRegion('Americas & Middle East');
              }}
              className="hover:text-stone-900 transition-colors"
            >
              Americas & Arabia
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            {/* Search Input on Desktop */}
            <div className="relative hidden sm:block w-48 lg:w-64">
              <input
                type="text"
                placeholder="Search destinations, food, trails..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-100 hover:bg-stone-200/70 focus:bg-white text-xs text-stone-900 placeholder-stone-400 rounded-md pl-8 pr-7 py-2 border border-stone-200 focus:border-stone-400 focus:outline-none transition-all"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-2 text-stone-400 hover:text-stone-700"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Mobile Search Icon */}
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="sm:hidden p-2 text-stone-600 hover:text-stone-900 focus-visible:outline-none"
              aria-label="Toggle mobile search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Bookmarks Counter Button */}
            <button
              onClick={onOpenBookmarks}
              className="relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 hover:text-stone-950 bg-stone-100 hover:bg-stone-200/80 rounded-md border border-stone-200 transition-colors whitespace-nowrap"
              title="View saved articles"
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-800" />
              <span className="hidden sm:inline">Saved</span>
              {bookmarkedIds.length > 0 && (
                <span className="font-mono text-[11px] bg-amber-800 text-white rounded-full px-1.5 py-0.2 leading-none">
                  {bookmarkedIds.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Dropdown */}
        {showMobileSearch && (
          <div className="sm:hidden pb-3 pt-1 border-t border-stone-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search guides, attractions, budgets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-100 text-xs text-stone-900 placeholder-stone-400 rounded-md pl-8 pr-7 py-2 border border-stone-300 focus:outline-none"
                autoFocus
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
