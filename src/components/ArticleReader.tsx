import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Printer,
  Calendar,
  Volume2,
  VolumeX,
  Compass,
  MapPin,
  Clock,
  Sparkles,
  Plane,
  Bed,
  Utensils,
  Sun,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react';
import { Article } from '../types/article';
import { BudgetCalculator } from './BudgetCalculator';
import { TravelTipsChecklist } from './TravelTipsChecklist';
import { getNextAndPrevArticles } from '../data/articles';

interface ArticleReaderProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (id: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export const ArticleReader: React.FC<ArticleReaderProps> = ({
  article,
  onBack,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('intro');
  const [isComfortSize, setIsComfortSize] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);
  const [isNarrating, setIsNarrating] = useState(false);

  const { prev, next } = getNextAndPrevArticles(article.id);

  // Track scroll depth progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on article change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsNarrating(false);
  }, [article.id]);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleNarration = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }
    if (isNarrating) {
      window.speechSynthesis.cancel();
      setIsNarrating(false);
    } else {
      window.speechSynthesis.cancel();
      const textToSpeak = `${article.title}. ${article.subtitle}. ${article.introduction.slice(0, 2).join(' ')}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.95;
      utterance.onend = () => setIsNarrating(false);
      utterance.onerror = () => setIsNarrating(false);
      window.speechSynthesis.speak(utterance);
      setIsNarrating(true);
    }
  };

  const sections = [
    { id: 'intro', label: '01. Introduction' },
    { id: 'dream', label: '02. Why It’s a Dream' },
    { id: 'attractions', label: '03. Major Attractions' },
    { id: 'things-to-do', label: '04. Things to Do' },
    { id: 'culinary', label: '05. Food to Try' },
    { id: 'seasons', label: '06. Best Time to Visit' },
    { id: 'transit', label: '07. How to Get There' },
    { id: 'stay', label: '08. Where to Stay' },
    { id: 'budget', label: '09. Estimated Budget' },
    { id: 'tips', label: '10. Travel Tips' },
    { id: 'memorable', label: '11. What Makes It Memorable' },
    { id: 'conclusion', label: '12. Conclusion' },
  ];

  return (
    <article className="min-h-screen bg-[#FAF8F5] pb-24 text-stone-900">
      {/* Pinned Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-amber-800 z-50 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Floating Share Toast Notification */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-stone-900 text-white px-4 py-2.5 rounded-md shadow-lg text-xs font-medium animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Dispatch link copied to clipboard</span>
        </div>
      )}

      {/* Reader Control Header Bar */}
      <div className="sticky top-18 z-30 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/90 py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-stone-950 transition-colors focus-visible:outline-none"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to Dispatch Archive</span>
          </button>

          {/* Reader Utilities */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Audio Narrator simulation */}
            <button
              onClick={toggleNarration}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded border transition-colors ${
                isNarrating
                  ? 'bg-amber-800 text-white border-amber-800 animate-pulse'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
              }`}
              title={isNarrating ? 'Pause Audio Reader' : 'Listen to Audio Summary'}
            >
              {isNarrating ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isNarrating ? 'Stop Audio' : 'Listen (15m)'}</span>
            </button>

            {/* Type Scale Adjuster */}
            <button
              onClick={() => setIsComfortSize(!isComfortSize)}
              className="px-2.5 py-1 text-xs font-mono font-medium rounded border bg-white text-stone-700 border-stone-200 hover:border-stone-400 transition-colors"
              title="Toggle reading text scale"
            >
              {isComfortSize ? 'Size: Regular' : 'Size: Comfort'}
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-1.5 rounded border bg-white text-stone-700 border-stone-200 hover:border-stone-400 transition-colors"
              title="Copy shareable link"
              aria-label="Share article"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>

            {/* Print */}
            <button
              onClick={handlePrint}
              className="hidden sm:block p-1.5 rounded border bg-white text-stone-700 border-stone-200 hover:border-stone-400 transition-colors"
              title="Print dispatch guide"
              aria-label="Print article"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>

            {/* Bookmark */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded border transition-colors ${
                isBookmarked
                  ? 'bg-amber-100/70 text-amber-900 border-amber-300'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark expedition'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-800 text-amber-800' : ''}`} />
              <span className="hidden sm:inline">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Article Main Masthead */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-8 text-center sm:text-left">
        {/* Unboxed Metadata without pills */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs font-mono uppercase tracking-wider text-amber-900 mb-4 font-semibold">
          <span>{article.country}</span>
          <span aria-hidden="true" className="text-stone-400">·</span>
          <span>{article.region}</span>
          <span aria-hidden="true" className="text-stone-400">·</span>
          <span>{article.readTime}</span>
          <span aria-hidden="true" className="text-stone-400">·</span>
          <span>Published {article.publishDate}</span>
        </div>

        <h1 className="font-serif-editorial text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-stone-900 leading-[1.12]">
          {article.title}
        </h1>

        <p className="mt-5 text-lg sm:text-xl text-stone-600 leading-relaxed font-light">
          {article.subtitle}
        </p>

        {/* Author Byline */}
        <div className="mt-8 pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-stone-900 text-amber-200 font-serif-editorial text-sm flex items-center justify-center font-bold">
              {article.author.avatarInitials}
            </div>
            <div className="text-left text-xs">
              <div className="font-semibold text-stone-900">{article.author.name}</div>
              <div className="text-stone-500">{article.author.role}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-stone-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              {article.publishDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              {article.readTime}
            </span>
          </div>
        </div>
      </header>

      {/* Hero Visual Presentation */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-12">
        <figure className="relative overflow-hidden rounded-lg border border-stone-200 bg-stone-100 shadow-md">
          <div className="aspect-[16/9] w-full overflow-hidden">
            <img
              src={article.heroImage}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <figcaption className="p-3 bg-stone-900 text-stone-300 text-xs font-serif-editorial italic">
            {article.imageCaption}
          </figcaption>
        </figure>
      </div>

      {/* Quick Facts Strip */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
        <div className="bg-white border border-stone-200 rounded-lg p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 shadow-xs">
          <div>
            <div className="text-[11px] font-mono uppercase text-stone-400">Ideal Duration</div>
            <div className="text-sm font-semibold text-stone-900 mt-1">{article.quickFacts.idealDuration}</div>
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase text-stone-400">Currency</div>
            <div className="text-sm font-semibold text-stone-900 mt-1">{article.quickFacts.currency}</div>
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase text-stone-400">Time Zone</div>
            <div className="text-sm font-semibold text-stone-900 mt-1">{article.quickFacts.timeZone}</div>
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase text-stone-400">Language</div>
            <div className="text-sm font-semibold text-stone-900 mt-1 truncate">{article.quickFacts.primaryLanguage}</div>
          </div>
        </div>
      </div>

      {/* Two-Column Reading Canvas: Left Navigation & Right Prose */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Sticky Table of Contents */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32 space-y-4 bg-white/70 backdrop-blur-sm border border-stone-200/90 rounded-lg p-4">
              <div className="text-xs font-mono uppercase tracking-wider text-stone-400 pb-2 border-b border-stone-100 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-800" />
                <span>Expedition Chapters</span>
              </div>
              <nav className="space-y-1">
                {sections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollTo(sec.id)}
                    className={`block w-full text-left px-2.5 py-1.5 text-xs rounded transition-colors whitespace-nowrap truncate ${
                      activeSection === sec.id
                        ? 'bg-amber-100/70 text-amber-950 font-semibold'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                    }`}
                  >
                    {sec.label}
                  </button>
                ))}
              </nav>

              <div className="pt-3 border-t border-stone-100 text-[11px] text-stone-400 font-mono">
                Progress: {Math.round(scrollProgress)}%
              </div>
            </div>
          </aside>

          {/* Right Column: Full Longform Narrative Prose */}
          <main className="lg:col-span-9 max-w-prose mx-auto lg:mx-0">
            {/* Section 1: Introduction */}
            <section id="intro" className="scroll-mt-28 mb-14">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-800 mb-2 font-semibold">
                Chapter 01
              </div>
              <h2 className="font-serif-editorial text-3xl font-medium text-stone-900 mb-6 pb-2 border-b border-stone-200">
                Introduction
              </h2>
              <div className={`space-y-5 text-stone-700 leading-relaxed ${isComfortSize ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>
                {article.introduction.map((paragraph, idx) => (
                  <p key={idx} className={idx === 0 ? 'drop-cap' : ''}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {/* Section 2: Why it's a dream destination */}
            <section id="dream" className="scroll-mt-28 mb-14">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-800 mb-2 font-semibold">
                Chapter 02
              </div>
              <h2 className="font-serif-editorial text-3xl font-medium text-stone-900 mb-6 pb-2 border-b border-stone-200">
                Why It’s a Dream Destination
              </h2>
              <div className={`space-y-5 text-stone-700 leading-relaxed ${isComfortSize ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>
                {article.whyDreamDestination.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Curatorial Pull Quote */}
              <blockquote className="my-8 py-5 px-6 bg-stone-100/90 border-l-4 border-amber-800 rounded-r-lg font-serif-editorial text-lg sm:text-xl italic text-stone-800 leading-relaxed">
                "{article.pullQuote}"
              </blockquote>
            </section>

            {/* Section 3: Major attractions */}
            <section id="attractions" className="scroll-mt-28 mb-14">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-800 mb-2 font-semibold">
                Chapter 03
              </div>
              <h2 className="font-serif-editorial text-3xl font-medium text-stone-900 mb-6 pb-2 border-b border-stone-200 flex items-center justify-between">
                <span>Major Attractions</span>
                <MapPin className="w-5 h-5 text-amber-800" />
              </h2>

              <div className="space-y-6">
                {article.majorAttractions.map((attraction, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-stone-200 rounded-lg p-6 shadow-xs transition-hover hover:border-stone-300"
                  >
                    <div className="flex items-center gap-2 text-xs font-mono text-amber-800 font-semibold mb-1">
                      <span>Attraction 0{idx + 1}</span>
                    </div>
                    <h3 className="font-serif-editorial text-xl sm:text-2xl font-semibold text-stone-900">
                      {attraction.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-stone-500 italic mt-0.5">
                      {attraction.tagline}
                    </p>
                    <p className="text-sm sm:text-base text-stone-700 leading-relaxed mt-3">
                      {attraction.description}
                    </p>
                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-start gap-2 text-xs text-stone-600 bg-stone-50 p-3 rounded">
                      <Sparkles className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-stone-800">Curator’s Highlight:</strong>{' '}
                        {attraction.highlight}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4: Things to do */}
            <section id="things-to-do" className="scroll-mt-28 mb-14">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-800 mb-2 font-semibold">
                Chapter 04
              </div>
              <h2 className="font-serif-editorial text-3xl font-medium text-stone-900 mb-6 pb-2 border-b border-stone-200 flex items-center justify-between">
                <span>Things to Do</span>
                <Compass className="w-5 h-5 text-amber-800" />
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {article.thingsToDo.map((act, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-stone-200 rounded-lg p-5 flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-stone-400 font-mono mb-2">
                        <span className="text-amber-800 font-semibold">{act.category}</span>
                        <span>{act.duration}</span>
                      </div>
                      <h4 className="font-serif-editorial text-lg font-semibold text-stone-900 leading-snug">
                        {act.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-2">
                        {act.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 5: Food to try */}
            <section id="culinary" className="scroll-mt-28 mb-14">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-800 mb-2 font-semibold">
                Chapter 05
              </div>
              <h2 className="font-serif-editorial text-3xl font-medium text-stone-900 mb-6 pb-2 border-b border-stone-200 flex items-center justify-between">
                <span>Food to Try & Gastronomy</span>
                <Utensils className="w-5 h-5 text-amber-800" />
              </h2>

              <div className="space-y-4">
                {article.foodToTry.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-stone-200 rounded-lg p-5 sm:p-6 shadow-xs"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="font-serif-editorial text-xl font-semibold text-stone-900">
                        {item.dish}
                      </h4>
                      {item.localName && (
                        <span className="text-xs font-mono text-stone-500 italic">
                          ({item.localName})
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mt-2.5">
                      {item.description}
                    </p>
                    {item.recommendedSpot && (
                      <div className="mt-3 text-xs text-amber-900 bg-amber-50/80 px-3 py-1.5 rounded inline-block font-medium">
                        📍 Recommended: {item.recommendedSpot}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Section 6: Best time to visit */}
            <section id="seasons" className="scroll-mt-28 mb-14">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-800 mb-2 font-semibold">
                Chapter 06
              </div>
              <h2 className="font-serif-editorial text-3xl font-medium text-stone-900 mb-6 pb-2 border-b border-stone-200 flex items-center justify-between">
                <span>Best Time to Visit</span>
                <Sun className="w-5 h-5 text-amber-800" />
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div className="bg-amber-50/70 border border-amber-200/80 p-4 rounded-md">
                  <div className="text-[11px] font-mono uppercase text-amber-800 font-semibold">
                    Peak Season
                  </div>
                  <div className="text-xs text-stone-700 mt-1 font-medium">
                    {article.bestTimeToVisit.peakSeason}
                  </div>
                </div>
                <div className="bg-emerald-50/70 border border-emerald-200/80 p-4 rounded-md">
                  <div className="text-[11px] font-mono uppercase text-emerald-800 font-semibold">
                    Shoulder Season (Best)
                  </div>
                  <div className="text-xs text-stone-700 mt-1 font-medium">
                    {article.bestTimeToVisit.shoulderSeason}
                  </div>
                </div>
                <div className="bg-stone-100/80 border border-stone-200 p-4 rounded-md">
                  <div className="text-[11px] font-mono uppercase text-stone-600 font-semibold">
                    Low Season
                  </div>
                  <div className="text-xs text-stone-700 mt-1 font-medium">
                    {article.bestTimeToVisit.lowSeason}
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
                {article.bestTimeToVisit.detailedGuide.map((guidance, idx) => (
                  <p key={idx}>{guidance}</p>
                ))}
              </div>
            </section>

            {/* Section 7: How to get there */}
            <section id="transit" className="scroll-mt-28 mb-14">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-800 mb-2 font-semibold">
                Chapter 07
              </div>
              <h2 className="font-serif-editorial text-3xl font-medium text-stone-900 mb-6 pb-2 border-b border-stone-200 flex items-center justify-between">
                <span>How to Get There & Transit</span>
                <Plane className="w-5 h-5 text-amber-800" />
              </h2>

              <div className="bg-white border border-stone-200 rounded-lg p-6 space-y-4 shadow-xs text-sm sm:text-base text-stone-700 leading-relaxed">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-amber-800 font-semibold">
                    International Flight Gateways
                  </h4>
                  <p className="mt-1">{article.howToGetThere.internationalGateways}</p>
                </div>
                <div className="pt-3 border-t border-stone-100">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-amber-800 font-semibold">
                    Visa Protocols & Entry
                  </h4>
                  <p className="mt-1">{article.howToGetThere.visaInformation}</p>
                </div>
                <div className="pt-3 border-t border-stone-100">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-amber-800 font-semibold">
                    Local Transportation & Connections
                  </h4>
                  <p className="mt-1">{article.howToGetThere.localTransit}</p>
                </div>
                <div className="pt-3 border-t border-stone-100 bg-amber-50/60 p-3 rounded">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-amber-900 font-semibold">
                    Insider Transit Counsel
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-stone-700">
                    {article.howToGetThere.insiderAdvice}
                  </p>
                </div>
              </div>
            </section>

            {/* Section 8: Where to stay */}
            <section id="stay" className="scroll-mt-28 mb-14">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-800 mb-2 font-semibold">
                Chapter 08
              </div>
              <h2 className="font-serif-editorial text-3xl font-medium text-stone-900 mb-6 pb-2 border-b border-stone-200 flex items-center justify-between">
                <span>Where to Stay</span>
                <Bed className="w-5 h-5 text-amber-800" />
              </h2>

              {/* Recommended Neighborhoods */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase text-stone-500 mb-3 tracking-wider">
                  Recommended Quarters & Districts
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {article.whereToStay.recommendedAreas.map((area, idx) => (
                    <div key={idx} className="bg-white border border-stone-200 rounded p-4 text-xs">
                      <div className="font-semibold text-stone-900 text-sm">{area.area}</div>
                      <div className="text-stone-600 mt-1">{area.vibe}</div>
                      <div className="text-amber-800 font-medium mt-2">Best for: {area.bestFor}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curated Lodging Options */}
              <div className="space-y-4">
                {article.whereToStay.options.map((opt, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-stone-200 rounded-lg p-5 shadow-xs"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-amber-800 font-semibold">
                        {opt.tier}
                      </span>
                      <span className="text-xs font-mono text-stone-700 font-medium">
                        {opt.priceRange}
                      </span>
                    </div>
                    <h4 className="font-serif-editorial text-xl font-semibold text-stone-900 mt-1">
                      {opt.name}
                    </h4>
                    <div className="text-xs text-stone-400 font-mono">Location: {opt.area}</div>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mt-2.5">
                      {opt.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 9: Estimated budget */}
            <section id="budget" className="scroll-mt-28 mb-14">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-800 mb-2 font-semibold">
                Chapter 09
              </div>
              <h2 className="font-serif-editorial text-3xl font-medium text-stone-900 mb-6 pb-2 border-b border-stone-200">
                Estimated Budget & Cost Analysis
              </h2>

              <BudgetCalculator
                tiers={article.estimatedBudget.tiers}
                flightEstimate={article.estimatedBudget.flightEstimate}
                moneySavingHacks={article.estimatedBudget.moneySavingHacks}
                currencySymbol={article.estimatedBudget.currencySymbol}
              />
            </section>

            {/* Section 10: Travel tips */}
            <section id="tips" className="scroll-mt-28 mb-14">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-800 mb-2 font-semibold">
                Chapter 10
              </div>
              <h2 className="font-serif-editorial text-3xl font-medium text-stone-900 mb-6 pb-2 border-b border-stone-200">
                Travel Tips, Etiquette & Field Checklist
              </h2>

              <TravelTipsChecklist tips={article.travelTips} />
            </section>

            {/* Section 11: What makes it memorable */}
            <section id="memorable" className="scroll-mt-28 mb-14">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-800 mb-2 font-semibold">
                Chapter 11
              </div>
              <h2 className="font-serif-editorial text-3xl font-medium text-stone-900 mb-6 pb-2 border-b border-stone-200">
                What Makes It Memorable
              </h2>
              <div className={`space-y-5 text-stone-700 leading-relaxed ${isComfortSize ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>
                {article.whatMakesItMemorable.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </section>

            {/* Section 12: Conclusion */}
            <section id="conclusion" className="scroll-mt-28 mb-16">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-800 mb-2 font-semibold">
                Chapter 12
              </div>
              <h2 className="font-serif-editorial text-3xl font-medium text-stone-900 mb-6 pb-2 border-b border-stone-200">
                Conclusion & Final Dispatch
              </h2>
              <div className={`space-y-5 text-stone-700 leading-relaxed ${isComfortSize ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>
                {article.conclusion.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </section>

            {/* Expedition Navigation Pager */}
            <div className="pt-8 border-t border-stone-300 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prev && (
                <button
                  onClick={() => onSelectArticle(prev.id)}
                  className="group p-5 bg-white border border-stone-200 rounded-lg text-left hover:border-amber-800 transition-colors shadow-xs"
                >
                  <div className="flex items-center gap-1.5 text-xs text-stone-400 font-mono">
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Previous Expedition</span>
                  </div>
                  <div className="font-serif-editorial text-lg font-semibold text-stone-900 group-hover:text-amber-900 transition-colors mt-1">
                    {prev.destination}
                  </div>
                  <div className="text-xs text-stone-500 truncate mt-0.5">{prev.subtitle}</div>
                </button>
              )}

              {next && (
                <button
                  onClick={() => onSelectArticle(next.id)}
                  className="group p-5 bg-white border border-stone-200 rounded-lg text-right hover:border-amber-800 transition-colors shadow-xs"
                >
                  <div className="flex items-center justify-end gap-1.5 text-xs text-stone-400 font-mono">
                    <span>Next Expedition</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                  <div className="font-serif-editorial text-lg font-semibold text-stone-900 group-hover:text-amber-900 transition-colors mt-1">
                    {next.destination}
                  </div>
                  <div className="text-xs text-stone-500 truncate mt-0.5">{next.subtitle}</div>
                </button>
              )}
            </div>
          </main>
        </div>
      </div>
    </article>
  );
};
