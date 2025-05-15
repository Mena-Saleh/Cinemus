import styles from './MovieGrid.module.css';
import SkeletonCard from '../MovieCard/MovieCardSkeleton';

export default function MovieGridSkeleton() {
    return (
        <div className={styles.grid}>
            {Array.from({ length: 12 }).map((_, index) => (
                <SkeletonCard key={index} />
            ))}
        </div>
    );
} 