'use client';
import { ClipLoader } from 'react-spinners';

export default function Loading() {
    return (
        <div className="loaderContainer">
            <ClipLoader
                color="var(--primary-400)"
                size={50}
                aria-label="Loading Spinner"
            />
        </div>
    );
}