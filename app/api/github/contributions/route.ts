import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'Mushfiq599';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function GET() {
    try {
        // ── GraphQL query for real contribution data ───
        const query = `
      {
        user(login: "${GITHUB_USERNAME}") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
            totalCommitContributions
            totalPullRequestContributions
            totalIssueContributions
            totalRepositoryContributions
          }
          followers { totalCount }
          repositories(first: 1, privacy: PUBLIC) {
            totalCount
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

        if (!res.ok) throw new Error(`GitHub GraphQL ${res.status}`);

        const { data, errors } = await res.json();
        if (errors) throw new Error(errors[0].message);

        const calendar = data.user.contributionsCollection.contributionCalendar;
        const collection = data.user.contributionsCollection;

        // ── Build weeks array ─────────────────────────
        const weeks: { date: string; count: number }[][] = calendar.weeks.map(
            (week: any) =>
                week.contributionDays.map((day: any) => ({
                    date: day.date,
                    count: day.contributionCount,
                }))
        );

        // ── Flatten all days for streak calc ─────────
        const allDays = weeks.flat().sort((a, b) =>
            a.date.localeCompare(b.date)
        );

        const totalContributions = calendar.totalContributions;

        // ── Current streak ────────────────────────────
        let currentStreak = 0;
        const today = new Date().toISOString().split('T')[0];
        const reversedDays = [...allDays].reverse();

        for (const day of reversedDays) {
            if (day.date > today) continue;
            if (day.count > 0) {
                currentStreak++;
            } else if (day.date < today) {
                break;
            }
        }

        // ── Longest streak ────────────────────────────
        let longestStreak = 0;
        let tempStreak = 0;
        for (const day of allDays) {
            if (day.count > 0) {
                tempStreak++;
                longestStreak = Math.max(longestStreak, tempStreak);
            } else {
                tempStreak = 0;
            }
        }

        // ── Average daily ─────────────────────────────
        const activeDays = allDays.filter((d) => d.count > 0).length;
        const averageDaily = activeDays > 0
            ? Math.round(totalContributions / Math.max(activeDays, 1))
            : 0;

        return NextResponse.json({
            weeks,
            stats: {
                totalCommits: totalContributions,
                currentStreak,
                longestStreak: Math.max(longestStreak, 1),
                publicRepos: data.user.repositories.totalCount,
                followers: data.user.followers.totalCount,
                averageDaily,
            },
        });

    } catch (err: any) {
        // ── Fallback to public events API if no token ──
        try {
            const pages = await Promise.allSettled(
                [1, 2, 3].map((p) =>
                    fetch(
                        `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100&page=${p}`,
                        {
                            headers: {
                                'User-Agent': 'Mozilla/5.0',
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

            const contributionMap: Record<string, number> = {};
            allEvents.forEach((event: any) => {
                const date = new Date(event.created_at).toISOString().split('T')[0];
                if (!contributionMap[date]) contributionMap[date] = 0;
                if (event.type === 'PushEvent') {
                    contributionMap[date] += event.payload?.size || 1;
                } else {
                    contributionMap[date] += 1;
                }
            });

            // Build 52-week grid
            const today = new Date();
            const startDate = new Date(today);
            startDate.setDate(today.getDate() - 364);
            startDate.setDate(startDate.getDate() - startDate.getDay());

            const weeks: { date: string; count: number }[][] = [];
            let current = new Date(startDate);
            while (current <= today) {
                const week: { date: string; count: number }[] = [];
                for (let d = 0; d < 7; d++) {
                    const dateStr = current.toISOString().split('T')[0];
                    week.push({ date: dateStr, count: contributionMap[dateStr] || 0 });
                    current.setDate(current.getDate() + 1);
                }
                weeks.push(week);
            }

            const totalCommits = Object.values(contributionMap).reduce((s, c) => s + c, 0);

            return NextResponse.json({
                weeks,
                stats: {
                    totalCommits,
                    currentStreak: 0,
                    longestStreak: 1,
                    publicRepos: 0,
                    followers: 0,
                    averageDaily: 0,
                },
            });
        } catch (fallbackErr: any) {
            return NextResponse.json({ error: err.message }, { status: 500 });
        }
    }
}