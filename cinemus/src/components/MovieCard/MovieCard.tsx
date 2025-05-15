import Image from 'next/image';
import { Star } from 'lucide-react';
import styles from './MovieCard.module.css';
import { MovieCard as MovieCardType } from '@/models/MovieCard';

interface MovieCardProps {
    movie: MovieCardType;
}

const TMDB_IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/w200';

export default function MovieCard({ movie }: MovieCardProps) {
    return (
        <div className={styles.card}>
            <Image
                src={`${TMDB_IMAGE_BASE_URL}${movie.posterPath}`}
                alt={`${movie.title} poster`}
                fill
                className={styles.poster}
                priority={false}
            />
            <div className={styles.overlay}>
                <div className={styles.info}>
                    <h3 className={styles.title}>{movie.title}</h3>
                    <span className={styles.year}>{movie.releaseYear}</span>
                    <div className={styles.rating}>
                        <Star fill="currentColor" size={16} className={styles.starIcon} />
                        <span>{movie.rating.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
