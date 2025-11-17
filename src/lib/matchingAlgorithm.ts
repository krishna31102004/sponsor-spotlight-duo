interface Location {
  lat: number;
  lng: number;
}

interface Sponsor {
  targetAudience: string[];
  preferredCategories?: string[];
  location?: Location;
  geographicRadius?: number; // in km
  minBudget: number;
  maxBudget: number;
}

interface Business {
  targetAudience?: string[];
  category?: string;
  location?: Location;
  minBudget: number;
  maxBudget: number;
}

interface Weights {
  audience: number;
  category: number;
  geo: number;
  budget: number;
}

/**
 * Calculate Haversine distance between two geographic points in kilometers
 */
function haversine(loc1: Location, loc2: Location): number {
  const R = 6371; // Earth's radius in km
  const dLat = (loc2.lat - loc1.lat) * Math.PI / 180;
  const dLng = (loc2.lng - loc1.lng) * Math.PI / 180;
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Calculate compatibility score between a sponsor and a business/host
 * Returns a score from 0-100
 */
export function compatibilityScore(
  sponsor: Sponsor,
  host: Business,
  weights: Weights = { audience: 0.3, category: 0.3, geo: 0.2, budget: 0.2 }
): number {
  let score = 0.0;
  
  // 1. Audience overlap (Jaccard similarity)
  const sponsorAudience = new Set(sponsor.targetAudience);
  const hostAudience = new Set(host.targetAudience || []);
  const intersection = new Set([...sponsorAudience].filter(x => hostAudience.has(x)));
  const union = new Set([...sponsorAudience, ...hostAudience]);
  const audienceOverlap = union.size > 0 ? intersection.size / union.size : 0;
  score += weights.audience * audienceOverlap * 100;
  
  // 2. Category match
  const catMatch = sponsor.preferredCategories && host.category && sponsor.preferredCategories.includes(host.category) ? 100 : 0;
  score += weights.category * catMatch;
  
  // 3. Geographic proximity (Haversine in km)
  let geoScore = 50; // neutral default
  if (sponsor.location && host.location) {
    const dist = haversine(sponsor.location, host.location);
    const radius = sponsor.geographicRadius || 100; // default 100km
    geoScore = Math.max(0, 100 * (1 - dist / radius));
  }
  score += weights.geo * geoScore;
  
  // 4. Budget fit
  const sponsorBudget = (sponsor.minBudget + sponsor.maxBudget) / 2;
  const hostRequired = (host.minBudget + host.maxBudget) / 2;
  let budgetScore = 100;
  if (sponsorBudget >= hostRequired) {
    budgetScore = 100;
  } else {
    budgetScore = 100 * (sponsorBudget / hostRequired);
  }
  score += weights.budget * Math.min(budgetScore, 100);
  
  return Math.round(score * 100) / 100; // Round to 2 decimal places
}
