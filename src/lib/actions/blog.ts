"use server"
import db from "@/lib/db"

export async function getBlogs({ query, page = 1, totalBlogs = false }: { query?: string, page?: number, totalBlogs?: number | boolean }) {
    const isLimit = typeof totalBlogs === 'number' ? totalBlogs : 0
    try {
        const blogs = await db.blog.findMany(
            {
                where: {
                    imageLink: { startsWith: process.env.NODE_ENV === 'development' ? "" : "" },
                    title: { contains: query === 'all' ? '' : query, mode: "insensitive" }
                },
                orderBy: { title: 'asc' },
                take: isLimit || undefined,
                skip: ((page - 1) * isLimit) || undefined,
                include: { author: { select: { username: true, imageUrl: true } } }
            }
        );

        const blogsLength = await db.anime.count({ where: { title: { contains: query === 'all' ? '' : query, mode: "insensitive" } } });

        const totalPages = Math.ceil(blogsLength / isLimit)

        return { blogs, totalPages }
    } catch (error) {
        console.log("getBlogs error");
        return { blogs: null, totalPages: 0 }
    }
}

export async function getBlog(id: string) {
    try {
        const blog = await db.blog.findUnique({ where: { id } })
        return blog
    } catch (error) {
        console.log("getBlog error");
    }
}