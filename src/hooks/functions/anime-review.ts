import { AnimeReviewType } from "@/lib/types";
import axios from "axios"

export function getReviews(animeId: string) {
    return async ({ pageParam }: { pageParam: number }): Promise<{ data: AnimeReviewType[], currentPage: number, nextPage: number | null }> => {
        const response = await axios.get(`/api/anime/${animeId}/review?page=${pageParam}`);
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

export function editReview(animeId: string, reviewId: string) {
    return async (data: { review: string }) => {
        const response = await axios.put(`/api/anime/${animeId}/review/${reviewId}`, { review: data.review });
        return response.data
    }
}

export function deleteReview(animeId: string, reviewId: string) {
    return async () => {
        const response = await axios.delete(`/api/anime/${animeId}/review/${reviewId}`);
        return response.data
    }
}