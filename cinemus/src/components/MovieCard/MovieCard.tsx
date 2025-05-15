'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Star, Heart } from 'lucide-react';
import styles from './MovieCard.module.css';
import { MovieCard as MovieCardType } from '@/models/MovieCard';
import { useFavoritesStore } from '@/stores/favoritesStore';

interface MovieCardProps {
    movie: MovieCardType;
}

const TMDB_IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/w200';

export default function MovieCard({ movie }: MovieCardProps) {
    const [overlayVisible, setOverlayVisible] = useState(false);
    const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
    const [pulse, setPulse] = useState(false);

    // Checks if it is mobile, in which case the first click only shows overlay and prevents navigation.
    const handleClick = (e: React.MouseEvent) => {
        if (window.innerWidth <= 768 && !overlayVisible) {
            e.preventDefault();
            setOverlayVisible(true);
        }
    };

    // Handles adding/removing from favorites
    const handleFavoriteClick = () => {
        if (isFavorite(movie.id)) {
            removeFavorite(movie.id);
        } else {
            addFavorite(movie.id);
        }

        // Trigger pulse animation that times out with the same animation duration
        setPulse(true);
        setTimeout(() => setPulse(false), 600);
    }
    return (
        <div className={styles.card}>
            <Heart
                size={32}
                className={`${styles.favoriteIcon} ${pulse ? styles.pulsate : ''}`}
                fill={isFavorite(movie.id) ? 'currentColor' : 'none'}
                onClick={handleFavoriteClick}>
            </Heart>

            <Image
                src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                alt={`${movie.title} poster`}
                fill
                sizes="150px, 200px"
                className={styles.poster}
                priority={false}
            />

            <Link href={`/details/${movie.id}`} tabIndex={0} role="button" onClick={handleClick}>
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
            </Link >
        </div >
    );
}
