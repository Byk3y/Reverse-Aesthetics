import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://reverseaesthetic.com'
  const currentDate = new Date().toISOString()
  
  const routes = [
    '',
    '/about',
    '/clinics',
    '/clinics/aesthetics',
    '/clinics/weightloss',
    '/clinics/wellness',
    '/clinics/dental',
    '/clinics/hair',
    '/gallery',
    '/blog',
    '/booking',
    '/contact'
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }))
}

