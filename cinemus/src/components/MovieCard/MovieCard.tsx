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
                src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                alt={`${movie.title} poster`}
                fill
                sizes="(max-width: 768px) 150px, 200px"
                className={styles.poster}
                priority={false}
            />
            <div className={styles.overlay}>
                <div className={styles.info}>
                    <h3 className={styles.title}>{movie.title}</h3>
                    <span className={styles.year}>{movie.release_date}</span>
                    <div className={styles.rating}>
                        <Star fill="currentColor" size={16} className={styles.starIcon} />
                        <span>{movie.vote_average.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
