const TMDB_API_BASE_URL = process.env.TMDB_API_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

if (!TMDB_API_KEY) {
    throw new Error('TMDB_API_KEY is not set in environment variables');
}

import axios, { AxiosError } from 'axios';

const tmdb = axios.create({
    baseURL: TMDB_API_BASE_URL,
    headers: {
        Authorization: `Bearer ${TMDB_API_KEY}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    params: {
        language: 'en-US',
        include_adult: false,
    },
});

export async function handleApiRequest<T>(
    endpoint: string,
    params: Record<string, string | number | boolean> = {}
): Promise<T> {
    try {
        const res = await tmdb.get<T>(endpoint, { params });
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 404) {
            throw new Error('Not Found');
        }
        throw new Error(`TMDB API request failed: ${err.message}`);
    }
}
