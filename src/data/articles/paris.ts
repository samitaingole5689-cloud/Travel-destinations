import { Article } from '../../types/article';

export const parisArticle: Article = {
  id: 'paris',
  title: 'Paris, France — The City of Art, Culture and Romance',
  subtitle: 'Haussmannian boulevards, luminous twilight along the Seine, and centuries of literary and gastronomic brilliance.',
  destination: 'Paris',
  country: 'France',
  region: 'Europe',
  theme: 'Culture & Art',
  readTime: '16 min read',
  publishDate: 'October 2026',
  author: {
    name: 'Antoine de Rochefort',
    role: 'Senior Cultural Correspondent, European Editions',
    avatarInitials: 'AR',
  },
  heroImage: '/src/assets/images/paris_art_romance_1791433383210.jpg',
  imageCaption: 'Fig. 2 — Blue hour settles over the Seine, as streetlamps illuminate classic wrought-iron balconies with the Eiffel Tower in soft focus.',
  pullQuote: 'Paris is not merely a geographic capital; it is a meticulously preserved theatrical stage where every cobblestone alley and zinc rooftop has been chronicled by poets, painters, and philosophers.',
  quickFacts: {
    idealDuration: '5–8 Days',
    primaryLanguage: 'French',
    currency: 'Euro (€ / EUR)',
    timeZone: 'GMT+1 (CET) / GMT+2 (CEST)',
    topVibe: 'Romantic, monumental, artistic, and effortlessly sophisticated',
  },
  introduction: [
    'Few urban landscapes on Earth exert as magnetic a grip on human imagination as Paris. Carved through by the gentle meanders of the Seine River and crowned by limestone facades that glow like warm honey under autumn sunshine, the French capital is an open-air museum where history is an ongoing, tactile dialogue. From the gothic majesty of Notre-Dame de Paris to the modernist audacity of the Centre Pompidou, the city balances monumental reverence with restless reinvention.',
    'To wander Paris is to engage in the art of the flâneur—a purposeful, unhurried drifting through winding passages, hidden courtyards, and tree-lined boulevards designed by Baron Haussmann in the 19th century. Mornings begin with the crisp shatter of a freshly baked croissant in a neighborhood boulangerie; afternoons dissolve inside cavernous salon galleries housing masterworks of the Renaissance and Impressionism; and evenings unfold across zinc-topped bistro tables over carafes of Côte du Rhône as zinc rooftops gleam under the moon.',
    'Beyond the well-trodden icons, Paris thrives in its discrete quarters: the bohemian village spirit of Montmartre, the aristocratic courtyards and Jewish bakeries of Le Marais, the scholarly intellectualism of the Latin Quarter, and the vibrant culinary renaissance sweeping the 11th and 10th arrondissements. It is a city that never stops rewarding the observant traveler.',
  ],
  whyDreamDestination: [
    'Paris is a dream destination because it elevates daily life into an aesthetic pursuit. In Paris, how a cafe waiter pours espresso, how a florist bundles garden roses in brown butcher paper, and how a baker scores a baguette with a razor blade are treated as matters of pride and cultural heritage. The French concept of l’art de vivre—the art of living well—is palpable on every street corner.',
    'Moreover, its artistic patrimony is unrivaled. Within a two-mile radius, one can stand inches away from the Mona Lisa, study Monet’s ethereal Water Lilies in immersive curved rooms, walk through Rodin’s sculpture gardens, and trace the steps of Hemingway, Gertrude Stein, and James Baldwin. It is a city that has nurtured the world’s greatest thinkers, making every visitor feel part of an enduring creative continuum.',
  ],
  majorAttractions: [
    {
      name: 'The Musée du Louvre & Tuileries Garden',
      tagline: 'The world’s grandest palace turned sanctuary of civilizational art.',
      description: 'Spanning eight centuries of French architectural history, the former royal palace holds over 35,000 works of art across 73,000 square meters. Beyond the Mona Lisa, explore the Winged Victory of Samothrace, the Venus de Milo, and the haunting beauty of French Romantic paintings before strolling out into the symmetrical gravel paths of the Jardin des Tuileries.',
      highlight: 'The dramatic contrast between I.M. Pei’s glass pyramid and the classical Renaissance stone facade at dusk.',
    },
    {
      name: 'Musée d’Orsay & Musée de l’Orangerie',
      tagline: 'The beating heart of Impressionist and Post-Impressionist genius.',
      description: 'Housed within a glorious Belle Époque railway station, the Musée d’Orsay hosts the world’s foremost collection of Degas, Renoir, Cézanne, Gauguin, and Van Gogh. Just across the river, the Orangerie displays Monet’s panoramic Water Lilies (Nymphéas) in custom oval chambers designed for meditation.',
      highlight: 'Looking out across the Paris skyline through the giant transparent station clock on the fifth floor.',
    },
    {
      name: 'The Eiffel Tower & Champ de Mars',
      tagline: 'The 1,083-foot wrought-iron beacon that defined modernity.',
      description: 'Constructed by Gustave Eiffel for the 1889 Exposition Universelle, this once-controversial industrial tower is now the eternal emblem of the city. Ascending to the summit reveals panoramic vistas spanning up to 50 miles on clear days, while its hourly five-minute twinkle after nightfall casts a magical spell over the city below.',
      highlight: 'Picnicking on the lawns of Champ de Mars with saucisson, Comté cheese, and wine as the hourly sparkle begins.',
    },
    {
      name: 'Montmartre & Basilique du Sacré-Cœur',
      tagline: 'The bohemian hilltop village of windmills, painters, and cobblestones.',
      description: 'Perched on the highest hill in Paris, Montmartre retains the winding, village-like character that drew Picasso, Toulouse-Lautrec, and Modigliani. The gleaming travertine dome of the Sacré-Cœur overlooks a sweeping panorama of the city, while quiet alleys behind the basilica lead to the last functioning vineyard in Paris, the Clos Montmartre.',
      highlight: 'Wandering the quiet residential staircase passages of Rue de l’Abreuvoir at dawn.',
    },
  ],
  thingsToDo: [
    {
      title: 'Drift on an Evening Seine River Bateau Cruise',
      category: 'Sightseeing & Architecture',
      description: 'Glide underneath the historic bridges—from the stone arches of Pont Neuf to the opulent gilded sculptures of Pont Alexandre III—as architectural floodlights illuminate the riverfront facades.',
      duration: '1.5 hours',
    },
    {
      title: 'Browse the Historic Bouquinistes and Stroll the Latin Quarter',
      category: 'Literary & Antiques',
      description: 'Inspect vintage leather-bound editions, retro travel posters, and antique postcards in the green metal stalls lining the Seine quays before visiting Shakespeare and Company bookstore.',
      duration: '3 hours',
    },
    {
      title: 'Take a Classical Pastry Masterclass in the Marais',
      category: 'Culinary Masterclass',
      description: 'Learn the delicate art of folding butter into laminated dough to create flaky croissants, or master the temperamental meringue technique required for crisp, airy macarons.',
      duration: '4 hours',
    },
    {
      title: 'Explore the Covered Arcades (Passages Couverts)',
      category: 'Hidden Architecture',
      description: 'Wander through Galerie Vivienne and Passage des Panoramas—19th-century glass-roofed shopping arcades lined with antiquarian bookshops, tearooms, and philatelists.',
      duration: '2 hours',
    },
  ],
  foodToTry: [
    {
      dish: 'Boeuf Bourguignon',
      localName: 'Burgundy Braised Beef Stew',
      description: 'Tender beef chuck slow-braised for hours in full-bodied red Burgundy wine, rich beef stock, carrots, pearl onions, lardons, and button mushrooms, served over buttered egg noodles.',
      recommendedSpot: 'Bistrot Paul Bert, 11th Arrondissement',
    },
    {
      dish: 'Duck Confit (Confit de Canard)',
      localName: 'Crispy Salt-Cured Duck Leg',
      description: 'Duck leg cured in coarse sea salt and thyme, slow-cooked submerged in its own rendered fat until yielding, then pan-crisped to a shattering golden skin, accompanied by Sarladaise potatoes.',
      recommendedSpot: 'Le Comptoir du Relais, Saint-Germain-des-Prés',
    },
    {
      dish: 'Croque Monsieur & Croque Madame',
      localName: 'Parisian Bistro Toasted Sandwich',
      description: 'Crusty pain de mie layered with artisanal jambon de Paris and Gruyère, smothered in silky nutmeg-infused mornay sauce, baked golden brown, and crowned with a sunny-side egg.',
      recommendedSpot: 'Café de Flore or Carette, Place des Vosges',
    },
    {
      dish: 'French Onion Soup (Soupe à l’Oignon Gratinée)',
      localName: 'Traditional Caramelized Onion Soup',
      description: 'Rich dark beef stock infused with deeply caramelized sweet onions, topped with a thick crouton and an overflowing crust of melted Gruyère and Comté cheese.',
      recommendedSpot: 'Au Pied de Cochon, Les Halles (Open 24/7)',
    },
  ],
  bestTimeToVisit: {
    peakSeason: 'June to August (Warm weather, bustling street terraces, peak crowds)',
    shoulderSeason: 'April to May & September to October (Crisp pleasant air, golden foliage, blooming parks)',
    lowSeason: 'November to February (Chilly temperatures, holiday lights, uncrowded museums, lower hotel rates)',
    detailedGuide: [
      'Spring (April to May) is arguably the most romantic season in Paris. Horse chestnut trees burst into delicate white and pink blossoms in the Luxembourg Gardens, and sidewalk cafe terraces come alive with locals savoring early afternoon sun.',
      'Autumn (September to October) offers magnificent golden foliage in the Tuileries and Bois de Boulogne, cultural reopening (la rentrée) with world-class art exhibitions, and crisp 15°C (59°F) afternoons ideal for long city walks.',
      'Summer brings long daylight hours until 10:00 PM, though August sees many local independent bistros close for annual holidays. Winter transforms Paris into a moody, atmospheric wonderland with sparkling Christmas lights and intimate, cozy bistros.',
    ],
  },
  howToGetThere: {
    internationalGateways: 'Paris-Charles de Gaulle (CDG) for major long-haul international flights; Paris-Orly (ORY) for European and Mediterranean routes; and Beauvais (BVA) for ultra-low-cost carriers.',
    visaInformation: 'Part of the European Schengen Zone. Citizens of the US, UK, Canada, Australia, and 60 other nations enter visa-free for up to 90 days in any 180-day period (ETIAS authorization required for eligible nationals).',
    localTransit: 'The Paris Métro and RER train network is one of the densest and most efficient in the world. Purchase an easy contactless Navigo Easy card or load single tickets (Ticket t+) directly onto your smartphone wallet.',
    insiderAdvice: 'Avoid the expensive taxi queues at CDG by taking the RER B direct train into central Paris (Châtelet-Les Halles or Gare du Nord) in under 35 minutes for just ~€11.80.',
  },
  whereToStay: {
    recommendedAreas: [
      { area: 'Le Marais (3rd/4th Arr.)', vibe: 'Historic mansions, chic boutiques, contemporary art galleries', bestFor: 'Trendsetters, art lovers, nightlife, dining' },
      { area: 'Saint-Germain-des-Prés (6th Arr.)', vibe: 'Intellectual elegance, historic cafes, luxury publishing houses', bestFor: 'Classic Parisian romance, upscale tranquility' },
      { area: 'Montmartre (18th Arr.)', vibe: 'Bohemian village charm, cobblestone hills, romantic panoramas', bestFor: 'Artists, couples seeking village intimacy' },
      { area: 'Canal Saint-Martin (10th Arr.)', vibe: 'Hip, youthful, innovative natural wine bars, waterside strolls', bestFor: 'Foodies, authentic neighborhood immersion' },
    ],
    options: [
      {
        tier: 'Ultra-Luxury & Iconic',
        name: 'Le Meurice, Dorchester Collection',
        area: '1st Arrondissement (Opposite Tuileries)',
        priceRange: '€1,200–€2,400 / night',
        description: 'An 18th-century palace hotel with interiors reimagined by Philippe Starck, housing an opulent two-Michelin-starred restaurant and pastry salon by Cédric Grolet.',
      },
      {
        tier: 'Boutique & Heritage',
        name: 'Hôtel Pavillon de la Reine',
        area: 'Place des Vosges, Le Marais',
        priceRange: '€450–€800 / night',
        description: 'Tucked behind ivy-draped arches on historic Place des Vosges, offering a private courtyard garden, antique fireplace lounge, and discreet spa.',
      },
      {
        tier: 'Mid-Range Comfort',
        name: 'Hôtel Fabric',
        area: 'Oberkampf, 11th Arrondissement',
        priceRange: '€180–€290 / night',
        description: 'A converted former textile factory featuring exposed brickwork, lofty industrial ceilings, plush colorful fabrics, and proximity to Paris’s most exciting neo-bistros.',
      },
    ],
  },
  estimatedBudget: {
    currencySymbol: '€ EUR',
    flightEstimate: '€400–€900 transatlantic round-trip; €80–€200 within Europe via flight or high-speed Eurostar/TGV.',
    tiers: [
      {
        tier: 'Backpacker / Budget',
        dailyCost: '€65–€95 / day',
        breakdown: {
          lodging: '€35–€50 (Hostel dorm or shared suburban flat)',
          food: '€20–€30 (Boulangerie sandwiches, crêpes, grocery picnics)',
          transit: '€5–€8 (Métro carnet tickets or walking)',
          activities: '€5–€10 (Free church visits, Paris Museum Pass amortized)',
        },
        overview: 'Practical for students and thrifty explorers taking advantage of city walking and park picnics.',
      },
      {
        tier: 'Mid-Range Explorer',
        dailyCost: '€180–€320 / day',
        breakdown: {
          lodging: '€110–€200 (Characterful boutique 3-star or Airbnb)',
          food: '€50–€80 (Prix-fixe bistro lunches, wine, cafes)',
          transit: '€10–€15 (Métro and occasional evening taxi)',
          activities: '€25–€40 (Major museum tickets, tower ascents, river cruise)',
        },
        overview: 'The golden balance: memorable boutique hotels, delicious multi-course dining, and curated exhibits.',
      },
      {
        tier: 'Luxury Connoisseur',
        dailyCost: '€600–€1,500+ / day',
        breakdown: {
          lodging: '€450–€1,000+ (5-star palace hotel or luxury Haussmannian suite)',
          food: '€150–€350 (Michelin-starred tasting menus, vintage wine)',
          transit: '€60–€120 (Private chauffeur service)',
          activities: '€80–€200 (Private after-hours Louvre tour, VIP opera tickets)',
        },
        overview: 'Sumptuous Parisian luxury with private palace accommodations and bespoke access.',
      },
    ],
    moneySavingHacks: [
      'Take advantage of the "Menu du Jour" (lunch formula) at top bistros, offering three gourmet courses for half the evening price.',
      'Book museum entry slots online weeks in advance to avoid queues and purchase a Paris Museum Pass if visiting 4+ venues.',
      'Tap water ("une carafe d’eau") and basket bread are legally free in all French restaurants.',
      'Explore Paris on foot—many iconic landmarks between Place de la Concorde and Notre-Dame are within an easy 40-minute walk.',
    ],
  },
  travelTips: [
    {
      category: 'Etiquette & Culture',
      title: 'The Magic of "Bonjour, Madame / Monsieur"',
      details: 'Always greet shopkeepers, cafe staff, and ticket agents with a polite "Bonjour" when entering and "Au revoir, bonne journée" when leaving. Failing to say hello is considered profoundly discourteous in France.',
    },
    {
      category: 'Safety & Health',
      title: 'Pickpocket Awareness at Key Hubs',
      details: 'Keep bags zippered and in front of you around the Eiffel Tower, Montmartre, and on crowded lines of Métro Line 1. Beware of petition clipboards and distraction games.',
    },
    {
      category: 'Connectivity & Apps',
      title: 'CityMapper & G7 Taxis',
      details: 'Download Citymapper for the most reliable real-time transit directions in Paris. Use the G7 taxi app for official regulated taxis with fixed airport flat rates.',
    },
    {
      category: 'Money & Tipping',
      title: 'Service Compris (Service Included)',
      details: 'Service is legally included in all French restaurant bills. Leaving a small coin tip (€1–€3 for casual dining, €5–€10 for fine dining) is appreciated for attentive service, but not obligatory.',
    },
  ],
  whatMakesItMemorable: [
    'The timeless magic of Paris lives in fleeting, unscripted moments: the crisp autumn smell of roasted chestnuts sold from copper braziers outside Métro entrances; the distant strains of an accordion playing Piaf under the stone arches of Place des Vosges; and the way twilight turns the limestone walls along the Quai de Conti an ethereal shade of slate-blue.',
    'It is memorable because Paris never demands that you rush. It insists that you sit, sip your café crème, observe the parade of stylish passersby, and reflect on the fleeting elegance of the passing hour. To visit Paris is to leave a piece of your heart anchored beside the Seine.',
  ],
  conclusion: [
    'Paris is an eternal masterpiece that defies the cynicism of over-tourism. Beneath its world-famous postcard scenes lies an endlessly captivating city of neighborhood solidarity, architectural harmony, and cultural devotion.',
    'Whether this is your inaugural ascent of the Eiffel Tower or your tenth time getting happily lost among the courtyards of the Marais, Paris unfailingly restores one’s faith in human artistry and the pursuit of romance.',
  ],
};
