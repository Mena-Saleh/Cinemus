'use client';
import Image from "next/image";
import { useFavoritesStore } from "@/stores/favoritesStore";
import styles from "./Poster.module.css";
import { useState, useEffect } from 'react';
import { Heart } from "lucide-react";

interface PosterProps {
    id: string;
    src: string;
    alt: string;
}

export default function Poster({ id, src, alt }: PosterProps) {
    const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
    const [pulse, setPulse] = useState(false);
    const [hydrated, setHydrated] = useState(false);

    // useEffect runs only on the client, this way we can ensure the component is hydrated
    useEffect(() => {
        setHydrated(true);
    }, []);

    // Checking favorite status after hydration to avoid SSR/CSR mismatch
    const isFav = hydrated ? isFavorite(id) : false;

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
                fill={isFav ? 'currentColor' : 'none'}
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
