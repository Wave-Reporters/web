import type { MetadataRoute } from 'next'
import {TABS} from "@/lib/types";

export default function sitemap(): MetadataRoute.Sitemap {

    return TABS.map((data) => {
        if(data.href === '/') {
            return {
                url: 'https://www.wavereporter.com/',
                lastModified: new Date(),
                priority: 1,
            }
        } else {
            return {
                url: 'https://www.wavereporter.com' + data.href,
                lastModified: new Date(),
                priority: 0.8,
            }
        }
    })
}