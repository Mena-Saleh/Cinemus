import { Heart } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p>
                Made with <Heart size={16} fill="currentColor" className={styles.heart} /> by Mena Saleh
            </p>
        </footer>
    );
}
