import styles from "./page.module.css";
import SearchBar from "@/components/SearchBar/SearchBar";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>
        Discover your next favorite movie.
      </h1>
      <h2>
        Search, explore, and build your personal watchlist.
      </h2>
      <SearchBar />
    </div>
  );
}
