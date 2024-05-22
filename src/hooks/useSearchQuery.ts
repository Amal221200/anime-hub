import { create } from "zustand";


interface SearchQueryStore {
    searchQuery: string,
    setSearchQuery: (val: string) => void
}

const useSearchQuery = create<SearchQueryStore>((set) => ({
    searchQuery: "",
    setSearchQuery: (val) => set({ searchQuery: val })
}))

export default useSearchQuery;