import { handleApiRequest } from './base';
import { MovieCard } from '@/models/MovieCard';
import { MovieCredits, MovieDetails } from '@/models/MovieDetails';
import { MovieDetailsResponse } from '@/models/MovieDetailsResponse';
import { PaginatedResponse } from '@/models/PaginatedResponse';

export async function searchMovies(query: string, page = 1) {
    return handleApiRequest<PaginatedResponse<MovieCard>>('/search/movie', { query, page });
}

export async function getMovieDetails(id: string): Promise<MovieDetailsResponse> {
    const [details, credits] = await Promise.all([
        handleApiRequest<MovieDetails>(`/movie/${id}`),
        handleApiRequest<MovieCredits>(`/movie/${id}/credits`),
    ]);
    return { details, credits };
}

export async function getMovieCardById(id: string): Promise<MovieCard> {
    return handleApiRequest<MovieCard>(`/movie/${id}`);
}
