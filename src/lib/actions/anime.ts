"use server"
import db from "@/lib/db"

export async function getAnimes(query?: string, page: number = 1, totalAnimes: number = 12) {

    try {
        const animes = await db.anime.findMany(
            {
                where: {
                    imageLink: { startsWith: process.env.NODE_ENV === 'development' ? "" : "" },
                    title: { contains: query ? query : '', mode: "insensitive" }
                },
                orderBy: { title: 'asc' },
            }
        );

        const totalPages = Math.ceil(animes.length / totalAnimes)

        const currentPageAnimes = animes.slice((page - 1) * totalAnimes, page * totalAnimes)
        return { animes: currentPageAnimes, totalPages }
    } catch (error) {
        console.log("getAnimes error");
        return { animes: null, totalPages: 0 }
    }
}

export async function getAnime(id: string) {
    try {
        const anime = await db.anime.findUnique({ where: { id } })
        return anime
    } catch (error) {
        console.log("getAnime error");
    }
}