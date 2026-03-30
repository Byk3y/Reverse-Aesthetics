import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://reverseaesthetic.com'
  const currentDate = new Date().toISOString()
  
  const routes = [
    { url: '', priority: 1.0, changeFrequency: 'weekly' },
    { url: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/clinics', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/clinics/aesthetics', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/clinics/weightloss', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/clinics/wellness', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/clinics/dental', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/clinics/hair', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/gallery', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/blog', priority: 0.8, changeFrequency: 'weekly' },
    { url: '/booking', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    
    // SEO Hub Pages (Locations)
    { url: '/locations/lagos', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/locations/abuja', priority: 0.9, changeFrequency: 'monthly' },
    
    // SEO Hub Pages (Treatments)
    { url: '/treatments/botox-and-dermal-fillers-lagos', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/treatments/hair-transplant-nigeria', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/treatments/medical-weight-loss-lagos', priority: 0.9, changeFrequency: 'monthly' },

    // SEO Hub Pages (Treatments - Phase 2)
    { url: '/treatments', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/treatments/dental-aesthetics-lagos', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/treatments/hifu-skin-tightening-nigeria', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/treatments/laser-skin-resurfacing-lagos', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/treatments/iv-glow-therapy-lagos', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/treatments/acne-scar-treatment-lagos', priority: 0.9, changeFrequency: 'monthly' },
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: currentDate,
    changeFrequency: route.changeFrequency as "weekly" | "monthly" | "yearly" | "always" | "hourly" | "daily" | "never" | undefined,
    priority: route.priority,
  }))
}

