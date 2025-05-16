'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchBar from '@/components/SearchBar/SearchBar';
import MovieGrid from '@/components/MovieGrid/MovieGrid';
import MovieGridSkeleton from '@/components/MovieGrid/MovieGridSkeleton';
import Pagination from '@/components/Pagination/Pagination';
import { MovieCard } from '@/models/MovieCard';
import styles from './page.module.css';

export default function SearchPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [query, setQuery] = useState<string>(searchParams.get('query') || '');
    const urlPage = Number(searchParams.get('page') || '1');

    const [movies, setMovies] = useState<MovieCard[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(urlPage);

    // Sync currentPage from URL on first mount (or on URL changes)
    useEffect(() => {
        setCurrentPage(urlPage);
    }, [urlPage]);

    // Fetch data from API when query or page changes
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
                const res = await fetch(`/api/movie/search?query=${encodeURIComponent(query)}&page=${urlPage}`);
                const data = await res.json();
                setMovies(data.results || []);
                setTotalPages(data.total_pages || 1);
                setHasSearched(true);
            } catch (error) {
                console.log(error);
                setError('An error occurred while searching for movies.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [query, urlPage]);

    // Update query state and reset current page to 1
    const onSearch = (value: string) => {
        setQuery(value);
        setCurrentPage(1);
    };

    // Update the URL without causing a full page reload (this is to sync the url with the new page)
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
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
}
