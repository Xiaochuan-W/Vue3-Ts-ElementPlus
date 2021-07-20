const defaultSettings = require('@/settings.ts')

const title = defaultSettings.title || 'Vue3 Ts Admin';

export default function getPageTitle(pageTitle:any): string {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
