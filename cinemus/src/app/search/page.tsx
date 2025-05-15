import SearchClient from '@/components/SearchClient/SearchClient';
import styles from './page.module.css';
import delay from '@/utils/delay';

interface SearchPageProps {
    searchParams: { query?: string; page?: string };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    // Simulate delay to check out loaders
    // await delay(2000);

    const { query, page } = await searchParams;

    return (
        <div className={styles.page}>
            <SearchClient initialQuery={query as string} initialPage={Number(page)} />
        </div>
    );
}
