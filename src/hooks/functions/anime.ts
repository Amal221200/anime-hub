import { Anime } from "@prisma/client";
import axios from "axios";

export function fetchAnimes(currentSearchQuery: string, searchQuery: string) {

    return async ({ pageParam }: { pageParam: number }): Promise<{ data: Anime[], currentPage: number, nextPage: number | null }> => {
        console.log(currentSearchQuery, searchQuery, 'anime');
        const response = await axios.get(`/api/anime?query=${currentSearchQuery || (searchQuery || '')}&page=${pageParam}`);
        const { animes, totalPages, page } = response.data
        console.log(totalPages);
        
        return {
            data: animes, currentPage: page, nextPage: pageParam < totalPages ? pageParam + 1 : null
        }
    }
}