import Image from "next/image";
import styles from "./Poster.module.css";

interface PosterProps {
    src: string;
    alt: string;
}

export default function Poster({ src, alt }: PosterProps) {
    return (
        <div className={styles.posterWrapper}>
            <Image
                src={src}
                alt={alt}
                width={300}
                height={450}
                className={styles.poster}
                priority
            />
        </div>
    );
}
