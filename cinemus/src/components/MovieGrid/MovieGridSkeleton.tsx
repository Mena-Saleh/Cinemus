import styles from './MovieGrid.module.css';
import SkeletonCard from '../MovieCard/MovieCardSkeleton';

interface MovieGridSkeletonProps {
    numCards?: number;
}

export default function MovieGridSkeleton({ numCards = 12 }: MovieGridSkeletonProps) {
    return (
        <div className={styles.grid}>
            {Array.from({ length: numCards }).map((_, index) => (
                <SkeletonCard key={index} />
            ))}
        </div>
    );
} 