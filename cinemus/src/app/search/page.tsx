import SearchBar from '@/components/SearchBar/SearchBar';
import MovieGrid from '@/components/MovieGrid/MovieGrid';
import { searchMovies } from '@/services/tmdb/movie';
import styles from './page.module.css';
import { MovieCard as MovieCardType } from '@/models/MovieCard';

interface SearchPageProps {
    searchParams: { query?: string; page?: number };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { query, page } = await searchParams;

    let movies: MovieCardType[] = [];
    if (query) {
        const response = await searchMovies(query);
        movies = response.results;
    }

    return (
        <div className={styles.page}>
            <SearchBar placeholder="Search movies..." initialValue={query} />
            <div className={styles.container}>
                {query ? (
                    <MovieGrid movies={movies} />
                ) : (
                    <p className={styles.empty}>Start typing to search for a movie.</p>
                )}
            </div>
        </div>
    );
}
