import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'Mushfiq599';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const headers: HeadersInit = {
    'User-Agent': 'Mozilla/5.0',
};
if (GITHUB_TOKEN) {
    (headers as Record<string, string>).Authorization = `Bearer ${GITHUB_TOKEN}`;
}

// Build 52-week contribution heatmap from GitHub events
export async function GET() {
    try {
        // ── 1. User profile ──────────────────────────────
        const userRes = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}`,
            {
                headers: {
                    ...headers,
                    Accept: 'application/vnd.github.v3+json',
                },
                next: { revalidate: 3600 },
            }
        );
        const userData = await userRes.json();

        // ── 2. Public events (up to 300) ─────────────────
        const pages = await Promise.allSettled(
            [1, 2, 3].map((p) =>
                fetch(
                    `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100&page=${p}`,
                    {
                        headers: {
                            ...headers,
                            Accept: 'application/vnd.github.v3+json',
                        },
                        next: { revalidate: 3600 },
                    }
                ).then((r) => (r.ok ? r.json() : []))
            )
        );

        const allEvents = pages.flatMap((p) =>
            p.status === 'fulfilled' ? p.value : []
        );

        // ── 3. Build day-level contribution map ──────────
        const contributionMap: Record<string, number> = {};

        allEvents.forEach((event: any) => {
            const date = new Date(event.created_at)
                .toISOString()
                .split('T')[0];
            if (!contributionMap[date]) contributionMap[date] = 0;

            if (event.type === 'PushEvent') {
                contributionMap[date] += event.payload?.size || 1;
            } else if (
                ['PullRequestEvent', 'IssuesEvent', 'CreateEvent', 'WatchEvent'].includes(
                    event.type
                )
            ) {
                contributionMap[date] += 1;
            }
        });

        // ── 4. Build 52-week grid ─────────────────────────
        const today = new Date();
        const weeks: { date: string; count: number }[][] = [];
        // Start from 52 weeks ago, aligned to Sunday
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - 364);
        // Rewind to previous Sunday
        startDate.setDate(startDate.getDate() - startDate.getDay());

        let current = new Date(startDate);
        while (current <= today) {
            const week: { date: string; count: number }[] = [];
            for (let d = 0; d < 7; d++) {
                const dateStr = current.toISOString().split('T')[0];
                week.push({
                    date: dateStr,
                    count: contributionMap[dateStr] || 0,
                });
                current.setDate(current.getDate() + 1);
            }
            weeks.push(week);
        }

        // ── 5. Streak calculation ─────────────────────────
        const sortedDates = Object.keys(contributionMap).sort();
        let currentStreak = 0;
        let longestStreak = 0;
        let tempStreak = 0;
        let totalCommits = 0;

        sortedDates.forEach((d) => {
            totalCommits += contributionMap[d];
        });

        const sortedDesc = [...sortedDates].reverse();
        for (const date of sortedDesc) {
            if (contributionMap[date] > 0) currentStreak++;
            else break;
        }

        sortedDates.forEach((date) => {
            if (contributionMap[date] > 0) {
                tempStreak++;
                longestStreak = Math.max(longestStreak, tempStreak);
            } else {
                tempStreak = 0;
            }
        });

        return NextResponse.json({
            weeks,
            stats: {
                totalCommits,
                currentStreak,
                longestStreak: Math.max(longestStreak, 1),
                publicRepos: userData.public_repos || 0,
                followers: userData.followers || 0,
                averageDaily: totalCommits > 0 ? Math.round(totalCommits / 365) : 0,
            },
        });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}