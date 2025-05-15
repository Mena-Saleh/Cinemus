import styles from './MovieCard.module.css';

export default function SkeletonCard() {
    return (
        <div className={styles.card}>
            <div className={styles.skeletonPoster} />
        </div>
    );
}
