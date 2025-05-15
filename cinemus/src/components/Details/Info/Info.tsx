import { Star } from "lucide-react";
import styles from "./Info.module.css";

interface InfoProps {
    title: string;
    overview: string;
    release_date: string;
    rating: number;
}

export default function Info({ title, overview, release_date, rating }: InfoProps) {
    return (
        <div className={styles.info}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.overview}>{overview}</p>
            <div className={styles.meta}>
                <span>Release: {release_date || "N/A"}</span>
                <span className={styles.rating}>
                    Rating: <Star fill="currentColor" size={16} className={styles.starIcon} /> {rating?.toFixed(1) ?? "N/A"}
                </span>
            </div>
        </div>
    );
}
