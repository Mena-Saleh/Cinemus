import { NextRequest, NextResponse } from 'next/server';
import { getMovieCardById } from '@/services/tmdb/movie';
import { MovieCard } from '@/models/MovieCard';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json({ error: 'Missing movie ID' }, { status: 400 });
    }

    const movie: MovieCard = await getMovieCardById(id);
    return NextResponse.json(movie, { status: 200 });

}
