/* Campaign attribution only: no cookies, storage, identifiers or extra requests. */
(() => {
  const sources = new Set(['youtube', 'instagram', 'community']);
  const supplied = new URLSearchParams(location.search).get('utm_source');
  const source = sources.has(supplied) ? supplied : 'website';
  for (const link of document.querySelectorAll('a[href]')) {
    const url = new URL(link.href, location.href);
    if (url.hostname === 'apps.apple.com' && url.pathname.includes('6812893389')) {
      url.searchParams.set('pt', '129464622');
      url.searchParams.set('ct', 'uk_small_landlords_' + source);
      url.searchParams.set('mt', '8');
      link.href = url.href;
    } else if (sources.has(supplied) && url.origin === location.origin && !url.pathname.endsWith('.pdf')) {
      url.searchParams.set('utm_source', source);
      url.searchParams.set('utm_medium', 'organic_social');
      url.searchParams.set('utm_campaign', 'uk_small_landlords');
      link.href = url.href;
    }
  }
})();
