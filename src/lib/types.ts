import { Blog, BlogReview, Review, User } from "@prisma/client";

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

export type AnimeReviewType = Review & { user: User };
export type BlogReviewType = BlogReview & { user: User };