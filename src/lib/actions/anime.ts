"use server"
import db from "@/lib/db"
import { ANIME_STATUS } from "@prisma/client";

export async function getAnimes({ query, fromYear, toYear, genre, page = 1, status, studio, artist, totalAnimes = false }: { query?: string, fromYear?: number, toYear?: number, genre?: string, status?: ANIME_STATUS, studio?: string, artist?: string, page?: number, totalAnimes?: number | boolean }) {
    const isLimit = typeof totalAnimes === 'number' ? totalAnimes : 0

    try {
        const animes = await db.anime.findMany(
            {
                where: {
                    title: { contains: query ? query : '', mode: "insensitive" },
                    genre: genre ? {
                        hasSome: [genre]
                    } : { isEmpty: false },
                    release: {
                        gte: new Date(`${fromYear ? fromYear : 1910}-01-01`),
                        lte: toYear ? new Date(`${toYear}-12-31`) : new Date(),
                    },
                    status: status ? {
                        equals: status
                    } : {},
                    studio: {
                        contains: studio ?? ''
                    },
                    artist: {
                        contains: artist ?? ''
                    }
                },
                orderBy: toYear || fromYear ? { release: 'asc' } : { title: 'asc' },
                take: isLimit || undefined,
                skip: ((page - 1) * isLimit) || undefined
            }
        );



        const animesLength = await db.anime.count({
            where: {
                title: { contains: query ? query : '', mode: "insensitive" },
                genre: genre ? {
                    hasSome: [genre]
                } : { isEmpty: false },
                release: {
                    gte: new Date(`${fromYear ? fromYear : 1910}-01-01`),
                    lte: toYear ? new Date(`${toYear}-12-31`) : new Date(),
                },
                status: status ? {
                    equals: status
                } : {},
                studio: {
                    contains: studio ?? ''
                },
                artist: {
                    contains: artist ?? ''
                }
            },
        });

        const totalPages = Math.ceil(animesLength / isLimit)

        return { animes, totalPages, page }
    } catch (error) {
        console.log("getAnimes error");
        return { animes: null, totalPages: 0, page: 0 }
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