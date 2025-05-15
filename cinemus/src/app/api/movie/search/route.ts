import { NextRequest, NextResponse } from 'next/server';
import { searchMovies } from '@/services/tmdb/movie';
import { PaginatedResponse } from '@/models/PaginatedResponse';
import { MovieCard } from '@/models/MovieCard';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');
    const page = Number(searchParams.get('page') || '1');

    if (!query || !query.trim()) {
        return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
    }

    const data: PaginatedResponse<MovieCard> = await searchMovies(query, page);
    return NextResponse.json(data, { status: 200 });
}
