import { APP_URL } from "@/lib/metadata";
import { MetadataRoute } from "next";


export default function robot(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: `${APP_URL}/sitemap.xml`,
    }
}