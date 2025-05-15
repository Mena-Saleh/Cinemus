import MovieCard from '../MovieCard/MovieCard';
import styles from './MovieGrid.module.css';
import { MovieCard as MovieCardType } from '@/models/MovieCard';

interface MovieGridProps {
    movies: MovieCardType[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
    return (
        <div className={styles.grid}>
            {movies.map((movie) => (
                movie.poster_path && (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                    />
                )
            ))}
        </div>
    );
}
