export interface Attraction {
  name: string;
  tagline: string;
  description: string;
  highlight: string;
}

export interface Activity {
  title: string;
  category: string;
  description: string;
  duration: string;
}

export interface CulinaryItem {
  dish: string;
  localName?: string;
  description: string;
  recommendedSpot?: string;
}

export interface AccommodationOption {
  tier: 'Boutique & Heritage' | 'Mid-Range Comfort' | 'Ultra-Luxury & Iconic';
  name: string;
  area: string;
  priceRange: string;
  description: string;
}

export interface BudgetTier {
  tier: 'Backpacker / Budget' | 'Mid-Range Explorer' | 'Luxury Connoisseur';
  dailyCost: string;
  breakdown: {
    lodging: string;
    food: string;
    transit: string;
    activities: string;
  };
  overview: string;
}

export interface TravelTip {
  category: 'Packing' | 'Etiquette & Culture' | 'Safety & Health' | 'Connectivity & Apps' | 'Money & Tipping';
  title: string;
  details: string;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  destination: string;
  country: string;
  region: 'Southeast Asia' | 'Europe' | 'South Asia' | 'East Asia' | 'North America' | 'Middle East' | 'Oceania';
  theme: 'Tropical' | 'Culture & Art' | 'Island & Coastal' | 'Alpine & Nature' | 'Heritage' | 'Metropolitan' | 'Luxury & Desert' | 'Adventure';
  readTime: string;
  publishDate: string;
  author: {
    name: string;
    role: string;
    avatarInitials: string;
  };
  heroImage: string;
  imageCaption: string;
  pullQuote: string;
  quickFacts: {
    idealDuration: string;
    primaryLanguage: string;
    currency: string;
    timeZone: string;
    topVibe: string;
  };
  introduction: string[];
  whyDreamDestination: string[];
  majorAttractions: Attraction[];
  thingsToDo: Activity[];
  foodToTry: CulinaryItem[];
  bestTimeToVisit: {
    peakSeason: string;
    shoulderSeason: string;
    lowSeason: string;
    detailedGuide: string[];
  };
  howToGetThere: {
    internationalGateways: string;
    visaInformation: string;
    localTransit: string;
    insiderAdvice: string;
  };
  whereToStay: {
    recommendedAreas: { area: string; vibe: string; bestFor: string }[];
    options: AccommodationOption[];
  };
  estimatedBudget: {
    currencySymbol: string;
    flightEstimate: string;
    tiers: BudgetTier[];
    moneySavingHacks: string[];
  };
  travelTips: TravelTip[];
  whatMakesItMemorable: string[];
  conclusion: string[];
}
