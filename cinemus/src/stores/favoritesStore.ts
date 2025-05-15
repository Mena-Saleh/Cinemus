import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FavoritesState = {
    // Set is used to avoid duplicates and to get O(1) time complexity for add, remove, and isFavorite
    favorites: Set<string>;
    addFavorite: (id: string) => void;
    removeFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
    getFavoriteList: () => string[]; // Convert to array for easy UI mapping
};

export const useFavoritesStore = create(
    persist<FavoritesState>(
        (set, get) => ({
            favorites: new Set(),

            addFavorite: (id) => {
                const updated = new Set(get().favorites);
                updated.add(id);
                set({ favorites: updated });
            },

            removeFavorite: (id) => {
                const updated = new Set(get().favorites);
                updated.delete(id);
                set({ favorites: updated });
            },

            isFavorite: (id) => get().favorites.has(id),

            getFavoriteList: () => Array.from(get().favorites),
        }),
        {
            name: 'favorites-store',
            // Convert Set to array for persistence in localStorage
            partialize: (state) => ({
                favorites: Array.from(state.favorites),
            }) as unknown as FavoritesState,
            // Convert array in localStorage back to Set for runtime
            merge: (persisted, current) => ({
                ...current,
                favorites: new Set((persisted as unknown as FavoritesState).favorites || []),
            }),
        }
    )
);
