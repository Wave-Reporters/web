import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://www.wavereporter.com/',
            lastModified: new Date(),
            priority: 1,
        },
        {
            url: 'https://www.wavereporter.com/report/daily',
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: 'https://www.wavereporter.com/report/weekly',
            lastModified: new Date(),
            priority: 0.8,
        },
    ]
}