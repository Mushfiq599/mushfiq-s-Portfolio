import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'Mushfiq599';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const headers: HeadersInit = {
    'User-Agent': 'Mozilla/5.0',
    Accept: 'application/vnd.github.v3+json',
};
if (GITHUB_TOKEN) {
    (headers as Record<string, string>).Authorization = `Bearer ${GITHUB_TOKEN}`;
}

export async function GET() {
    try {
        const res = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}`,
            { headers, next: { revalidate: 3600 } }
        );
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        const data = await res.json();
        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}