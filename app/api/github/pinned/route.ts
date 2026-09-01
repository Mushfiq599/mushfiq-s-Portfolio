import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'Mushfiq599';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function GET() {
    if (!GITHUB_TOKEN) {
        return NextResponse.json(
            { error: 'GITHUB_TOKEN not set', pinned: [], languages: [] },
            { status: 401 }
        );
    }

    try {
        const query = `
      {
        user(login: "${GITHUB_USERNAME}") {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                name
                description
                url
                stargazerCount
                forkCount
                pushedAt
                primaryLanguage { name color }
                languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
                  edges {
                    size
                    node { name color }
                  }
                }
              }
            }
          }
          repositories(first: 100, privacy: PUBLIC, orderBy: { field: PUSHED_AT, direction: DESC }) {
            nodes {
              languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
                edges {
                  size
                  node { name color }
                }
              }
            }
          }
        }
      }
    `;

        const res = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'User-Agent': 'Mozilla/5.0',
            },
            body: JSON.stringify({ query }),
            next: { revalidate: 3600 },
        });

        const json = await res.json();

        if (json.errors) throw new Error(json.errors[0].message);

        const user = json.data?.user;
        if (!user) throw new Error('No user data returned');

        // ── Pinned repos ──────────────────────────────
        const pinned = (user.pinnedItems?.nodes || []).map((repo: any) => ({
            name: repo.name,
            description: repo.description || '',
            url: repo.url,
            stars: repo.stargazerCount,
            forks: repo.forkCount,
            primaryLanguage: repo.primaryLanguage || null,
            languages: (repo.languages?.edges || []).map((e: any) => ({
                name: e.node.name,
                color: e.node.color || '#7C3AED',
                size: e.size,
            })),
            pushedAt: repo.pushedAt,
        }));

        // ── Language totals ───────────────────────────
        const langTotals: Record<string, { size: number; color: string }> = {};
        (user.repositories?.nodes || []).forEach((repo: any) => {
            (repo.languages?.edges || []).forEach((e: any) => {
                const name = e.node.name;
                if (!langTotals[name]) {
                    langTotals[name] = { size: 0, color: e.node.color || '#7C3AED' };
                }
                langTotals[name].size += e.size;
            });
        });

        const totalSize = Object.values(langTotals).reduce((s, l) => s + l.size, 0);
        const languages = Object.entries(langTotals)
            .map(([name, { size, color }]) => ({
                name,
                color: color || '#7C3AED',
                percentage: Math.round((size / totalSize) * 100),
            }))
            .filter((l) => l.percentage >= 1)
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 8);

        return NextResponse.json({ pinned, languages });

    } catch (err: any) {
        console.error('Pinned API error:', err.message);
        return NextResponse.json(
            { error: err.message, pinned: [], languages: [] },
            { status: 500 }
        );
    }
}