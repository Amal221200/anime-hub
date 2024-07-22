import db from "@/lib/db";
import { APP_URL } from "@/lib/metadata";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const blogs = await db.blog.findMany({ select: { id: true, updatedAt: true } })
    const animes = await db.anime.findMany({ select: { id: true, updatedAt: true } })

    const blogUrls = blogs.map((blog) => ({
        url: `${APP_URL}/blog/${blog.id}`,
        lastModifies: blog.updatedAt
    }))

    const animeUrls = animes.map((anime) => ({
        url: `${APP_URL}/anime/${anime.id}`,
        lastModifies: anime.updatedAt
    }))

    return [
        {
            url: APP_URL,
            lastModified: new Date()
        },
        {
            url: `${APP_URL}/anime`,
            lastModified: new Date()
        },
        ...animeUrls,
        {
            url: `${APP_URL}/blog`,
            lastModified: new Date()
        },
        ...blogUrls,
        {
            url: `${APP_URL}/sign-in`,
            lastModified: new Date()
        },
        {
            url: `${APP_URL}/sign-up`,
            lastModified: new Date()
        },
    ]
}