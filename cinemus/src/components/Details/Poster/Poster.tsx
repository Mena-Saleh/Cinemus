'use client';
import Image from "next/image";
import { useFavoritesStore } from "@/stores/favoritesStore";
import styles from "./Poster.module.css";
import { useState } from 'react';
import { Heart } from "lucide-react";

interface PosterProps {
    id: string;
    src: string;
    alt: string;
}

export default function Poster({ id, src, alt }: PosterProps) {
    const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
    const [pulse, setPulse] = useState(false);

    // Handles adding/removing from favorites
    const handleFavoriteClick = () => {
        if (isFavorite(id)) {
            removeFavorite(id);
        } else {
            addFavorite(id);
        }
        // Trigger pulse animation that times out with the same animation duration
        setPulse(true);
        setTimeout(() => setPulse(false), 600);
    }
    return (
        <div className={styles.posterWrapper}>
            <Heart
                size={38}
                className={`favoriteIcon ${pulse ? 'pulsate' : ''} ${styles.posterIcon}`}
                fill={isFavorite(id) ? 'currentColor' : 'none'}
                onClick={handleFavoriteClick}
                aria-label="Favorite button"
            >
            </Heart>

            <Image
                src={src}
                alt={alt}
                fill
                sizes="250px, 300px"
                className={styles.poster}
                priority
            />
        </div>
    );
}
