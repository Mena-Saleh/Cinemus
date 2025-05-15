'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchBar from '@/components/SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieGridSkeleton from '../MovieGrid/MovieGridSkeleton';
import { MovieCard } from '@/models/MovieCard';
import styles from './SearchClient.module.css';
import delay from '@/utils/delay';

export default function SearchClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [movies, setMovies] = useState<MovieCard[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const query = searchParams.get('query') || '';
    const page = Number(searchParams.get('page') || '1');

    useEffect(() => {
        const fetchData = async () => {
            if (!query) {
                setMovies([]);
                setHasSearched(false);
                return;
            }
            setIsLoading(true);
            try {
                // Simulating network delay to check skeletons
                await delay(500);
                const res = await fetch(`/api/search?query=${encodeURIComponent(query)}&page=${page}`);
                const data = await res.json();
                setMovies(data.results || []);
                setHasSearched(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [query, page]);

    const onSearch = (value: string) => {
        router.push(`/search?query=${encodeURIComponent(value)}&page=1`);
    };

    return (
        <div className={styles.container}>
            <SearchBar initialValue={query} onSearch={onSearch} />
            {isLoading ? (
                <MovieGridSkeleton />
            ) : !query ? (
                <p className={styles.message}>Start typing to search for a movie.</p>
            ) : movies.length === 0 && hasSearched ? (
                <p className={styles.message}>Oops, no results found. Try typing another keyword.</p>
            ) : (
                <MovieGrid movies={movies} />
            )}
        </div>
    );
}
