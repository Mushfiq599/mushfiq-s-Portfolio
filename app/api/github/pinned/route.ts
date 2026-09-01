import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'Mushfiq599';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function GET() {
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
                primaryLanguage {
                  name
                  color
                }
                languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
                  edges {
                    size
                    node {
                      name
                      color
                    }
                  }
                }
                pushedAt
              }
            }
          }
          repositories(first: 100, privacy: PUBLIC) {
            nodes {
              languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                edges {
                  size
                  node {
                    name
                    color
                  }
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

        if (!res.ok) throw new Error(`GraphQL API ${res.status}`);

        const { data, errors } = await res.json();
        if (errors) throw new Error(errors[0].message);

        // ── Pinned repos ──────────────────────────────
        const pinned = data.user.pinnedItems.nodes.map((repo: any) => ({
            name: repo.name,
            description: repo.description || '',
            url: repo.url,
            stars: repo.stargazerCount,
            forks: repo.forkCount,
            primaryLanguage: repo.primaryLanguage,
            languages: repo.languages.edges.map((e: any) => ({
                name: e.node.name,
                color: e.node.color || '#7C3AED',
                size: e.size,
            })),
            pushedAt: repo.pushedAt,
        }));

        // ── Language totals across ALL repos ──────────
        const langTotals: Record<string, { size: number; color: string }> = {};
        data.user.repositories.nodes.forEach((repo: any) => {
            repo.languages.edges.forEach((e: any) => {
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
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}