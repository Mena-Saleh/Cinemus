'use client';
import { ClipLoader } from 'react-spinners';
import styles from './loading.module.css';

export default function Loading() {
    return (
        <div className={styles.container}>
            <ClipLoader
                color="var(--primary-400)"
                size={50}
                aria-label="Loading Spinner"
            />
        </div>
    );
}