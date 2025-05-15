'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchBar from '@/components/SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieGridSkeleton from '../MovieGrid/MovieGridSkeleton';
import { MovieCard } from '@/models/MovieCard';
import styles from './SearchClient.module.css';
import delay from '@/utils/delay';

export default function SearchClient({ initialQuery, initialPage }: { initialQuery: string; initialPage: number }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [movies, setMovies] = useState<MovieCard[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const query = searchParams.get('query') || '';
    const page = Number(searchParams.get('page') || '1');

    useEffect(() => {
        const fetchData = async () => {
            if (!query) {
                setMovies([]);
                return;
            }
            setIsLoading(true);
            try {
                // Simulating network delay to check skeletons
                // await delay(1000);
                const res = await fetch(`/api/search?query=${encodeURIComponent(query)}&page=${page}`);
                const data = await res.json();
                setMovies(data.results || []);
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
            <SearchBar initialValue={initialQuery} onSearch={onSearch} />
            {isLoading ? (
                <MovieGridSkeleton />
            ) : query ? (
                <MovieGrid movies={movies} />
            ) : (
                <p className={styles.empty}>Start typing to search for a movie.</p>
            )}
        </div>
    );
}
