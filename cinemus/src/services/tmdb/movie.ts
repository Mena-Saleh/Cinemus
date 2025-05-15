import { handleApiRequest } from './base';
import { MovieCard } from '@/models/MovieCard';
import { MovieCredits, MovieDetails } from '@/models/MovieDetails';
import { MovieDetailsResponse } from '@/models/MovieDetailsResponse';
import { PaginatedResponse } from '@/models/PaginatedResponse';

export async function searchMovies(query: string, page = 1) {
    return handleApiRequest<PaginatedResponse<MovieCard>>('/search/movie', { query, page });
}

export async function getMovieDetails(movieId: string): Promise<MovieDetailsResponse> {
    const [details, credits] = await Promise.all([
        handleApiRequest<MovieDetails>(`/movie/${movieId}`),
        handleApiRequest<MovieCredits>(`/movie/${movieId}/credits`),
    ]);
    return { details, credits };
}
