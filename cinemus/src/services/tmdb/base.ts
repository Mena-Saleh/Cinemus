import { notFound } from "next/navigation";

const TMDB_API_BASE_URL = process.env.TMDB_API_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

if (!TMDB_API_KEY) {
    throw new Error('TMDB_API_KEY is not set in environment variables');
}

function getHeaders() {
    return {
        Authorization: `Bearer ${TMDB_API_KEY}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
    };
}

function getCommonParams() {
    return {
        language: 'en-US',
        include_adult: 'false',
    };
}

function buildQuery(params: Record<string, string | number | boolean>) {
    return Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}

export async function handleApiRequest<T>(
    endpoint: string,
    params: Record<string, string | number | boolean> = {}
): Promise<T> {
    const queryParams = {
        ...getCommonParams(),
        ...params,
    };

    const url = `${TMDB_API_BASE_URL}${endpoint}?${buildQuery(queryParams)}`;
    const res = await fetch(url, {
        headers: getHeaders(),
    });

    if (res.status === 404) {
        throw new Error(`Not Found: ${res.statusText}`);
    }
    if (!res.ok) {
        throw new Error(`TMDB API request failed: ${res.statusText}`);
    }

    return res.json();
} 