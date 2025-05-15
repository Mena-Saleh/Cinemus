'use client';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

export default function Error() {
    const router = useRouter();
    return (
        <div className={styles.errorPage}>
            <h1 className={styles.errorTitle}>Something went wrong</h1>
            <p className={styles.errorMessage}>We couldn&apos;t load the movie details. Please try again later.</p>
            <button className={styles.backButton} onClick={() => router.push('/')}>Back to Home</button>
        </div>
    );
} 