import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <Link href="/">
                <Image
                    src="/logo.svg"
                    alt="Cinemus Logo"
                    width={120}
                    height={40}
                    priority
                />
            </Link>

            <nav className={styles.nav}>
                <Link href="/favourites" className={styles.navLink}>
                    <Heart size={20} fill="currentColor" />
                    Favourites
                </Link>
            </nav>
        </header >
    );
}