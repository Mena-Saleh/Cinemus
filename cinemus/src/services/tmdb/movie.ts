import { handleApiRequest } from './base';
import { MovieCard } from '@/models/MovieCard';
import { PaginatedResponse } from '@/models/PaginatedResponse';

export async function searchMovies(query: string, page = 1) {
    return handleApiRequest<PaginatedResponse<MovieCard>>('/search/movie', { query, page });
}

export async function getMovieDetails(movieId: number) {
    return handleApiRequest<MovieCard>(`/movie/${movieId}`);
}
