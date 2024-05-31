import { BlogType } from "@/lib/types";
import axios from "axios";

export function fetchBlogs(currentSearchQuery: string, searchQuery: string) {

    return async ({ pageParam }: { pageParam: number }): Promise<{ data: BlogType[], currentPage: number, nextPage: number | null }> => {
        const response = await axios.get(`/api/blog?query=${currentSearchQuery || searchQuery}&page=${pageParam}`);
        const { blogs, totalPages, page } = response.data
        return {
            data: blogs, currentPage: page, nextPage: pageParam < totalPages ? pageParam + 1 : null
        }
    }
}