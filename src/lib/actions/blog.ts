"use server"
import db from "@/lib/db"

export async function getBlogs({ query, fromYear, toYear, page = 1, totalBlogs = false }: { query?: string, page?: number, fromYear?: number, toYear?: number, totalBlogs?: number | boolean }) {
    const isLimit = typeof totalBlogs === 'number' ? totalBlogs : 0
    try {
        const blogs = await db.blog.findMany(
            {
                where: {
                    title: { contains: query ?? '', mode: "insensitive" },
                    published: true,
                    createdAt: {
                        gte: new Date(`${fromYear ?? 1910}-01-01`),
                        lte: toYear ? new Date(`${toYear}-12-31`) : new Date(),
                    }
                },
                orderBy: { title: 'asc' },
                take: isLimit || undefined,
                skip: ((page - 1) * isLimit) || undefined,
                include: { author: { select: { username: true, imageUrl: true } } }
            }
        );

        const blogsLength = await db.blog.count({
            where: {
                title: {
                    contains: query ?? '', mode: "insensitive",
                },
                published: true,
                updatedAt: {
                    gte: new Date(`${fromYear ?? 1910}-01-01`),
                    lte: toYear ? new Date(`${toYear}-12-31`) : new Date(),
                }
            }
        });

        const totalPages = Math.ceil(blogsLength / isLimit)

        return { blogs, totalPages, page }
    } catch (error) {
        console.log("getBlogs error");
        return { blogs: null, totalPages: 0, page: 0 }
    }
}

export async function getBlog(id: string) {
    try {
        const blog = await db.blog.findUnique({ where: { id }, include: { author: { select: { username: true, imageUrl: true, id: true, externalUserId: true, createdAt: true, updatedAt: true } } } })

        return blog
    } catch (error) {
        console.log("getBlog error");
    }
}