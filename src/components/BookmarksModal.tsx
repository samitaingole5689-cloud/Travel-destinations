import React from 'react';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { Article } from '../types/article';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedIds: string[];
  articles: Article[];
  onSelectArticle: (id: string) => void;
  onRemoveBookmark: (id: string) => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  bookmarkedIds,
  articles,
  onSelectArticle,
  onRemoveBookmark,
}) => {
  if (!isOpen) return null;

  const savedArticles = articles.filter((a) => bookmarkedIds.includes(a.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-lg shadow-xl border border-stone-200 w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-amber-800" />
            <h3 className="font-serif-editorial text-xl font-semibold text-stone-900">
              Saved Expeditions ({savedArticles.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3">
          {savedArticles.length === 0 ? (
            <div className="text-center py-12 text-stone-500">
              <Bookmark className="w-8 h-8 text-stone-300 mx-auto mb-3" />
              <p className="text-sm font-medium text-stone-700">No saved expeditions yet</p>
              <p className="text-xs text-stone-400 mt-1 max-w-xs mx-auto">
                Click the bookmark icon on any expedition card to save guides for your reading journey.
              </p>
            </div>
          ) : (
            savedArticles.map((article) => (
              <div
                key={article.id}
                className="group p-3.5 bg-stone-50 hover:bg-stone-100/80 border border-stone-200 rounded-md flex items-center justify-between gap-3 transition-colors"
              >
                <div
                  onClick={() => {
                    onSelectArticle(article.id);
                    onClose();
                  }}
                  className="cursor-pointer flex items-center gap-3 flex-1 min-w-0"
                >
                  <img
                    src={article.heroImage}
                    alt={article.destination}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 object-cover rounded shrink-0 border border-stone-200"
                  />
                  <div className="min-w-0">
                    <div className="text-[11px] font-mono text-amber-800 uppercase font-semibold">
                      {article.country} · {article.readTime}
                    </div>
                    <div className="font-serif-editorial text-sm font-semibold text-stone-900 truncate">
                      {article.title}
                    </div>
                    <div className="text-xs text-stone-500 truncate mt-0.5">
                      {article.subtitle}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => {
                      onSelectArticle(article.id);
                      onClose();
                    }}
                    className="p-1.5 text-stone-600 hover:text-stone-950 hover:bg-stone-200 rounded"
                    title="Read expedition"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveBookmark(article.id)}
                    className="p-1.5 text-stone-400 hover:text-red-700 hover:bg-red-50 rounded"
                    title="Remove bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-stone-200 bg-stone-50 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 border border-stone-300 rounded hover:bg-stone-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
