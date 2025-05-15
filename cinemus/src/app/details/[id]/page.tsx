import { getMovieDetails } from "@/services/tmdb/movie";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MovieDetailsResponse } from "@/models/MovieDetailsResponse";
import { Star } from "lucide-react";

export default async function DetailsPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    try {
        const res: MovieDetailsResponse = await getMovieDetails(id);
        if (!res || !res.details) return notFound();
        const { details, credits } = res;
        const posterUrl = details.poster_path
            ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p/w500"}${details.poster_path}`
            : "/no-poster.png"; // Could add a fallback poster later (but we already filtered out no poster movies)

        const cast = credits.cast.slice(0, 3);
        const crew = credits.crew.slice(0, 3);
        return (
            <div className={styles.detailsPage}>
                <div className={styles.posterWrapper}>
                    <Image
                        src={posterUrl}
                        alt={details.title}
                        width={300}
                        height={450}
                        className={styles.poster}
                        priority
                    />
                </div>
                <div className={styles.info}>
                    <h1 className={styles.title}>{details.title}</h1>
                    <p className={styles.overview}>{details.overview}</p>
                    <div className={styles.meta}>
                        <span>Release: {details.release_date ?? "N/A"}</span>
                        <span className={styles.rating}>Rating:
                            <Star fill="currentColor" size={16} className={styles.starIcon} />
                            {details.vote_average?.toFixed(1) ?? "N/A"}</span>
                    </div>
                    <div className={styles.creditsSection}>
                        <h2>Top Cast</h2>
                        <ul className={styles.creditsList}>
                            {cast.map((person) => (
                                <li key={person.id} className={styles.creditItem}>
                                    <strong>{person.name}</strong> <span>as {person.character}</span>
                                </li>
                            ))}
                        </ul>
                        <h2>Top Crew</h2>
                        <ul className={styles.creditsList}>
                            {crew.map((person) => (
                                <li key={person.id} className={styles.creditItem}>
                                    <strong>{person.name}</strong> <span>({person.job})</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        throw new Error("Failed to load movie details");
    }
}