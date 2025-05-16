import styles from './Pagination.module.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

type PageEntry = number | '...';

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
    const handleChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        onPageChange(newPage);
    };

    const getPageEntries = (): PageEntry[] => {
        const page = currentPage;
        const entries: PageEntry[] = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) entries.push(i);
            return entries;
        }

        entries.push(1); // First page

        if (page > 3) entries.push('...'); // Farther than first page by more than 1
        if (page > 2) entries.push(page - 1); // Farther than first page by 1
        if (page !== 1 && page !== totalPages) entries.push(page); // Current page
        if (page < totalPages - 1) entries.push(page + 1); // Farther than last page by 1
        if (page < totalPages - 2) entries.push('...'); // Farther than last page by more than 1

        if (totalPages !== 1) entries.push(totalPages); // Last page

        return entries;
    };

    const entries = getPageEntries();

    return (
        <div className={styles.pagination}>
            <button
                className={styles.paginationButton}
                onClick={() => handleChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous"
            >
                <ChevronLeft size={18} color="var(--primary-300)" />
            </button>

            {entries.map((entry, index) =>
                entry === '...' ? (
                    <span key={`ellipsis-${index}`} className={styles.ellipsis}>...</span>
                ) : (
                    <button
                        key={entry}
                        className={`${styles.page} ${entry === currentPage ? styles.active : ''}`}
                        onClick={() => handleChange(entry)}
                        disabled={entry === currentPage}
                    >
                        {entry}
                    </button>
                )
            )}

            <button
                className={styles.paginationButton}
                onClick={() => handleChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next"
            >
                <ChevronRight size={18} color="var(--primary-300)" />
            </button>
        </div>
    );
}
