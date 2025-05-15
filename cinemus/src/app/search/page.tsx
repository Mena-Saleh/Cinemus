import styles from "./page.module.css";
import SearchBar from "@/components/SearchBar/SearchBar";
import MovieGrid from "@/components/MovieGrid/MovieGrid";

const mockMovies = [
    {
        id: 1,
        title: "Inception",
        posterPath: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
        releaseYear: "2010",
        rating: 8.8,
    },
    {
        id: 2,
        title: "Interstellar",
        posterPath: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        releaseYear: "2014",
        rating: 8.6,
    },
    {
        id: 3,
        title: "The Dark Knight",
        posterPath: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        releaseYear: "2008",
        rating: 9.0,
    },
    {
        id: 4,
        title: "Pulp Fiction",
        posterPath: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
        releaseYear: "1994",
        rating: 8.9,
    },
    {
        id: 5,
        title: "The Dark Knight",
        posterPath: "/cij4dd21v2Rk2YtUQbV5kW69WB2.jpg",
        releaseYear: "2008",
        rating: 8.5,
    },
    {
        id: 6,
        title: "Inception",
        posterPath: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
        releaseYear: "2010",
        rating: 8.8,
    },
    {
        id: 7,
        title: "Interstellar",
        posterPath: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        releaseYear: "2014",
        rating: 8.6,
    },
    {
        id: 8,
        title: "The Dark Knight",
        posterPath: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        releaseYear: "2008",
        rating: 9.0,
    },
    {
        id: 9,
        title: "Pulp Fiction",
        posterPath: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
        releaseYear: "1994",
        rating: 8.9,
    },
    {
        id: 10,
        title: "The Dark Knight",
        posterPath: "/cij4dd21v2Rk2YtUQbV5kW69WB2.jpg",
        releaseYear: "2008",
        rating: 8.5,
    },

];

export default function SearchPage() {
    return (
        <div className={styles.page}>
            <SearchBar />
            <div className={styles.container}>
                <MovieGrid movies={mockMovies} />
            </div>
        </div>
    );
}
