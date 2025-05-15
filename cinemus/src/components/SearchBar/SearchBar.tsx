'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './SearchBar.module.css';

interface SearchBarProps {
    placeholder?: string;
    initialValue?: string;
    onSearch?: (query: string) => void;
}

export default function SearchBar({ placeholder = "Search movies...", initialValue = "", onSearch }: SearchBarProps) {
    const [query, setQuery] = useState(initialValue);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmedQuery = query.trim();
        if (onSearch) {
            onSearch(trimmedQuery);
        } else {
            // If no onSearch prop is provided, redirect to the search page (default behavior from homepage)
            router.push(`/search?query=${encodeURIComponent(trimmedQuery)}&page=1`);
        }
    };

    return (
        <form className={styles.searchForm} onSubmit={handleSubmit}>
            <div className={styles.searchContainer}>
                <button type="submit" className={styles.searchButton}>
                    <Search className={styles.searchIcon} size={20} />
                </button>
                <input
                    type="text"
                    name="search"
                    placeholder={placeholder}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={styles.searchInput}
                    required
                />
            </div>
        </form>
    );
}
