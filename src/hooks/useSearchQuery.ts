import { create } from "zustand";


interface SearchQueryStore {
    query: string,
    setQuery: (val: string) => void
}

const useSearchQuery = create<SearchQueryStore>((set) => ({
    query: "",
    setQuery: (val) => set({ query: val })
}))

export default useSearchQuery;