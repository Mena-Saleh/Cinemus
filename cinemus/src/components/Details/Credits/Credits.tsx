import styles from "./Credits.module.css";

interface Person {
    id: number;
    name: string;
    character?: string;
    job?: string;
}

interface CreditsProps {
    cast: Person[];
    crew: Person[];
}

export default function Credits({ cast, crew }: CreditsProps) {
    return (
        <div className={styles.creditsSection}>
            <h2>Top Cast</h2>
            <ul className={styles.creditsList}>
                {cast.map((person, index) => (
                    <li key={index} className={styles.creditItem}>
                        <strong>{person.name}</strong> <span>as {person.character}</span>
                    </li>
                ))}
            </ul>
            <h2>Top Crew</h2>
            <ul className={styles.creditsList}>
                {crew.map((person, index) => (
                    <li key={index} className={styles.creditItem}>
                        <strong>{person.name}</strong> <span>({person.job})</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
