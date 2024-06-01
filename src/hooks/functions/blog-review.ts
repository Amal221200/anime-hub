import { BlogReviewType } from "@/lib/types";
import axios from "axios"

export function getBlogReviews(blogId: string) {
    return async ({ pageParam }: { pageParam: number }): Promise<{ data: BlogReviewType[], currentPage: number, nextPage: number | null }> => {
        const response = await axios.get(`/api/blog/${blogId}/review?page=${pageParam}`);
        const { blogReviews, page, totalPages } = response.data
        return { data: blogReviews, currentPage: page, nextPage: pageParam < totalPages ? pageParam + 1 : null }
    }
}

export function addBlogReview(blogId: string) {
    return async (data: { review: string }) => {
        const response = await axios.post(`/api/blog/${blogId}/review`, { review: data.review });
        return response.data
    }
}

export function editBlogReview(blogId: string, reviewId: string) {
    return async (data: { review: string }) => {
        const response = await axios.put(`/api/blog/${blogId}/review/${reviewId}`, { review: data.review });
        return response.data
    }
}

export function deleteBlogReview(blogId: string, reviewId: string) {
    return async () => {
        const response = await axios.delete(`/api/blog/${blogId}/review/${reviewId}`);
        return response.data
    }
}