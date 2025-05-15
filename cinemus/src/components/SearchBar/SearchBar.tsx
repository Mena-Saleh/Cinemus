'use client';
import { Search } from 'lucide-react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
    placeholder?: string;
    onSearch?: (query: string) => void;
}

export default function SearchBar({ placeholder = "Search movies...", onSearch }: SearchBarProps) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get('search') as string;
        onSearch?.(query);
    };

    return (
        <form className={styles.searchForm} onSubmit={handleSubmit}>
            <div className={styles.searchContainer}>
                <button type="submit" className={styles.searchButton}>
                    <Search className={styles.searchIcon} size={20} />
                </button>
                <input
                    type="search"
                    name="search"
                    placeholder={placeholder}
                    className={styles.searchInput}
                    required
                />
            </div>
        </form>
    );
}
