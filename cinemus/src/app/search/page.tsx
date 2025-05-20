'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchBar from '@/components/SearchBar/SearchBar';
import MovieGrid from '@/components/MovieGrid/MovieGrid';
import MovieGridSkeleton from '@/components/MovieGrid/MovieGridSkeleton';
import Pagination from '@/components/Pagination/Pagination';
import { MovieCard } from '@/models/MovieCard';
import styles from './page.module.css';
import { PaginatedResponse } from '@/models/PaginatedResponse';

export default function SearchPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get from URL search params
    const query = searchParams.get('query') || '';
    const page = Number(searchParams.get('page') || '1');

    const [movies, setMovies] = useState<MovieCard[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [error, setError] = useState('');

    // Refetches when query or page changes (from the URL)
    useEffect(() => {
        const fetchData = async () => {
            if (!query) {
                setMovies([]);
                setHasSearched(false);
                return;
            }

            setIsLoading(true);
            setError('');

            try {
                const res = await fetch(`/api/movie/search?query=${encodeURIComponent(query)}&page=${page}`);
                const data: PaginatedResponse<MovieCard> = await res.json();
                setMovies(data.results || []);
                setTotalPages(data.total_pages || 1);
                setHasSearched(true);
            } catch (err) {
                console.error(err);
                setError('An error occurred while searching for movies.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [query, page]);

    // Update query + resets to page 1
    const onSearch = (value: string) => {
        const params = new URLSearchParams();
        params.set('query', value);
        params.set('page', '1');
        router.replace(`/search?${params.toString()}`);
    };

    // Updates page from URL params
    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        router.replace(`/search?${params.toString()}`);
    };

    return (
        <div className={styles.page}>
            <SearchBar initialValue={query} onSearch={onSearch} />

            {isLoading ? (
                <MovieGridSkeleton />
            ) : error ? (
                <p className={`${styles.Message} ${styles.error}`}>{error}</p>
            ) : !query ? (
                <p className={styles.message}>Start typing to search for a movie.</p>
            ) : movies.length === 0 && hasSearched ? (
                <p className={styles.message}>Oops, no results found. Try typing another keyword.</p>
            ) : (
                <>
                    <MovieGrid movies={movies} />
                    <Pagination
                        totalPages={totalPages}
                        currentPage={page}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
}
