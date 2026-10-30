/**
 * Helper to resolve static asset paths from the public directory.
 * Ensures the correct path is constructed whether running in local development or deployed
 * with a base path (e.g. GitHub Pages /jagdish-narigara-portfolio-website/).
 */
export function getAssetUrl(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
}
