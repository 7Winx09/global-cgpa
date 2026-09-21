// Auto-generated: University keys that have actual page files in src/pages/
// Run check-pages.js to regenerate

export const UNIVERSITY_KEYS_WITH_PAGES: readonly string[] = [
  'du',
  'sppu',
  'vtu',
  'mumbai',
  'anna',
  'aktu',
  'gtu',
  'ktu',
  'makaut',
  'calcutta',
] as const;

export function hasUniversityPage(key: string): boolean {
  return UNIVERSITY_KEYS_WITH_PAGES.includes(key);
}

export function getUniversitiesWithPages(): readonly string[] {
  return UNIVERSITY_KEYS_WITH_PAGES;
}

export function getUniversitiesWithoutPages(allKeys: readonly string[]): string[] {
  return allKeys.filter((k) => !UNIVERSITY_KEYS_WITH_PAGES.includes(k));
}