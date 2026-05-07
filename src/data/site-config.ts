export const SITE_URL = "https://sullivan-county-tn.codyboring.workers.dev";
export const SITE_NAME = "Sullivan County, Tennessee";
// Hard-coded literal so SSR and client always agree (Date.now() at module
// load can drift across a year boundary). Bump on January 1.
export const CURRENT_YEAR = 2026;
