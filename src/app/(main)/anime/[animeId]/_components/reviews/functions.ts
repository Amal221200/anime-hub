import { Review, User } from "@prisma/client";
import axios from "axios"

export type ReviewType = Review & { user: User };

export function getReviews(animeId: string) {
    return async ({ pageParam }: { pageParam: number }): Promise<{ data: ReviewType[], currentPage: number, nextPage: number | null }> => {
        const response = await axios.get(`/api/anime/${animeId}/review`);
        const { reviews, page, totalPages } = response.data
        return { data: reviews, currentPage: page, nextPage: pageParam < totalPages ? pageParam + 1 : null }
    }
}

export function addReview(animeId: string) {
    return async (data: { review: string }) => {
        const response = await axios.post(`/api/anime/${animeId}/review`, { review: data.review });
        return response.data
    }
}