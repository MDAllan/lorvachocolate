import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lorvachocolate.com'
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl,             lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${siteUrl}/products`,  lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${siteUrl}/breakable`, lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${siteUrl}/favors`,    lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${siteUrl}/custom`,    lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/gallery`,   lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${siteUrl}/about`,     lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/contact`,   lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/privacy`,   lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${siteUrl}/terms`,     lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  return staticRoutes
}
