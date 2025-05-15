'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Star } from 'lucide-react';
import styles from './MovieCard.module.css';
import { MovieCard as MovieCardType } from '@/models/MovieCard';

interface MovieCardProps {
    movie: MovieCardType;
}

const TMDB_IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/w200';

export default function MovieCard({ movie }: MovieCardProps) {
    const [overlayVisible, setOverlayVisible] = useState(false);

    // Checks if it is mobile, in which case the first click only shows overlay and prevents navigation.
    const handleClick = (e: React.MouseEvent) => {
        if (window.innerWidth <= 768 && !overlayVisible) {
            e.preventDefault();
            setOverlayVisible(true);
        }
    };

    return (
        <div className={styles.card}>
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
