import { Blog, BlogReview, AnimeReview, User } from "@prisma/client";
import { addAnimeReview,  deleteAnimeReview, editAnimeReview, getAnimeReviews } from "./actions/anime-review";
import { addBlogReview, deleteBlogReview, editBlogReview, getBlogReviews } from "./actions/blog-review";
import { getAnimes } from "./actions/anime";
import { getBlogs } from "./actions/blog";

export type BlogType = Blog & {
    author: {
        username: string,
        imageUrl: string
    }
}

export type BlogWithAuthor = Blog & {
    author: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string;
        externalUserId: string;
        username: string;
    }
}

export type AnimeReviewType = AnimeReview & { user: User };
export type BlogReviewType = BlogReview & { user: User };

export interface ActionsType {
    addAnimeReview: typeof addAnimeReview;
    editAnimeReview: typeof editAnimeReview,
    deleteAnimeReview: typeof deleteAnimeReview,
    addBlogReview: typeof addBlogReview,
    deleteBlogReview: typeof deleteBlogReview,
    editBlogReview: typeof editBlogReview,
    getAnimeReviews: typeof getAnimeReviews,
    getBlogReviews: typeof getBlogReviews,
    getAnimes: typeof getAnimes,
    getBlogs: typeof getBlogs,
}

export interface ActionsProviderType {
    actions: ActionsType
}