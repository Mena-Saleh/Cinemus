import { NextRequest, NextResponse } from 'next/server';
import { searchMovies } from '@/services/tmdb/movie';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');
    const page = Number(searchParams.get('page') || '1');

    if (!query) return NextResponse.json({ results: [] });

    const data = await searchMovies(query, page);
    return NextResponse.json(data);
}
