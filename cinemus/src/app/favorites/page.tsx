'use client';
import { useEffect, useState } from "react";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { MovieCard as MovieCardType } from "@/models/MovieCard";
import MovieGrid from "@/components/MovieGrid/MovieGrid";
import MovieGridSkeleton from "@/components/MovieGrid/MovieGridSkeleton";
import styles from "./page.module.css";

export default function FavoritesPage() {
    const { getFavoriteList } = useFavoritesStore();
    const [movies, setMovies] = useState<MovieCardType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchFavorites = async () => {
            setIsLoading(true);
            setError("");
            try {
                const ids: string[] = getFavoriteList();
                const results: MovieCardType[] = await Promise.all(
                    ids.map(async (id) => {
                        const res = await fetch(`/api/movie/${id}`);
                        return res.json();
                    })
                );
                setMovies(results);
            } catch (error) {
                console.log(error);
                setError("An error occurred while loading your favorites.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchFavorites();
    }, [getFavoriteList]);

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>My Favorites</h1>
            {isLoading ? (
                <MovieGridSkeleton />
            ) : error ? (
                <p className={styles.message + " " + styles.error}>{error}</p>
            ) : movies.length === 0 ? (
                <p className={styles.message}>You have no favorite movies yet.</p>
            ) : (
                <MovieGrid movies={movies} />
            )}
        </div>
    );
}