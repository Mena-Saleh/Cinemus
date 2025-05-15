'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import styles from './SearchBar.module.css';
import { useState } from 'react';

interface SearchBarProps {
    placeholder?: string;
    initialValue?: string;
}

export default function SearchBar({ placeholder = "Search movies...", initialValue = "" }: SearchBarProps) {
    const router = useRouter();
    const [query, setQuery] = useState(initialValue);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/search?query=${encodeURIComponent(query.trim())}&page=1`);
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
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={styles.searchInput}
                    required
                />
            </div>
        </form>
    );
}
