export interface MovieDetails {
    title: string;
    overview: string;
    genres: { id: number; name: string }[];
    runtime: number | null;
    vote_average: number;
    vote_count: number;
    poster_path: string | null;
    release_date: string;
}

export interface MovieCredits {
    cast: {
        id: number;
        name: string;
        known_for_department: string;
        character: string;
    }[];
    crew: {
        id: number;
        name: string;
        known_for_department: string;
        job: string;
    }[];
}
