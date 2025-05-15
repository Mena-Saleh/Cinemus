import SearchClient from '@/components/SearchClient/SearchClient';
import styles from './page.module.css';
import delay from '@/utils/delay';


export default async function SearchPage() {
    // Simulate delay to check out loaders
    // await delay(2000);

    // This page can just be a client component, but I'm keeping it as a server component for now to check out the loaders
    return (
        <div className={styles.page}>
            <SearchClient />
        </div>
    );
}
