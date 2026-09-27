export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    const allowedPaths = ['/', '/robots.txt', '/sitemap.xml', '/sitemap-index.xml', '/sitemap-0.xml', '/404.html'];

    if (!allowedPaths.includes(pathname) && !pathname.startsWith('/_astro/') && !pathname.startsWith('/api/')) {
      return new Response(null, { status: 301, headers: { Location: '/' } });
    }

    if (pathname === '/404.html') {
      const response = await env.ASSETS.fetch(request);
      return new Response(response.body, {
        status: 404,
        headers: response.headers
      });
    }

    const response = await env.ASSETS.fetch(request);

    if (pathname === '/') {
      return new Response(response.body, {
        status: 503,
        headers: {
          ...Object.fromEntries(response.headers),
          'Retry-After': '86400',
          'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
          'X-Robots-Tag': 'noindex, follow'
        }
      });
    }

    return new Response(response.body, {
      status: response.status,
      headers: {
        ...Object.fromEntries(response.headers),
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400'
      }
    });
  }
};