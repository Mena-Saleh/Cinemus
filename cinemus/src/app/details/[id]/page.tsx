import { getMovieDetails } from "@/services/tmdb/movie";
import Poster from "@/components/Details/Poster/Poster";
import Info from "@/components/Details/Info/Info";
import Credits from "@/components/Details/Credits/Credits";
import styles from "./page.module.css";
import { MovieDetailsResponse } from "@/models/MovieDetailsResponse";

export default async function DetailsPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const res: MovieDetailsResponse = await getMovieDetails(id);

    const { details, credits } = res;
    const posterUrl = details.poster_path
        ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p/w500"}${details.poster_path}`
        : "/no-poster.png";

    return (
        <div className={styles.detailsPage}>
            <Poster id={id} src={posterUrl} alt={details.title} />
            <div>
                <Info
                    title={details.title}
                    overview={details.overview}
                    release_date={details.release_date}
                    rating={details.vote_average}
                />
                <Credits cast={credits.cast.slice(0, 3)} crew={credits.crew.slice(0, 3)} />
            </div>
        </div>
    );
}
