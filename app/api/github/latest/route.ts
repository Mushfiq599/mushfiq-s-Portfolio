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
        // ── 1. Get all public repos sorted by last push ──
        const reposRes = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=10`,
            { headers, next: { revalidate: 300 } } // refresh every 5 mins
        );

        if (!reposRes.ok) throw new Error(`GitHub API ${reposRes.status}`);
        const repos = await reposRes.json();

        // Filter out the portfolio repo itself and forked repos
        const filtered = repos.filter(
            (r: any) => !r.fork && r.name !== 'mushfiq-s-Portfolio'
        );

        if (!filtered.length) throw new Error('No repos found');

        const latest = filtered[0];

        // ── 2. Try to read package.json for tech stack ───
        let techs: string[] = [];

        try {
            const pkgRes = await fetch(
                `https://api.github.com/repos/${GITHUB_USERNAME}/${latest.name}/contents/package.json`,
                { headers, next: { revalidate: 300 } }
            );

            if (pkgRes.ok) {
                const pkgData = await pkgRes.json();
                const decoded = JSON.parse(
                    Buffer.from(pkgData.content, 'base64').toString('utf-8')
                );

                const allDeps = {
                    ...decoded.dependencies,
                    ...decoded.devDependencies,
                };

                // Map common package names to display names
                const techMap: Record<string, string> = {
                    next: 'Next.js',
                    react: 'React',
                    'react-dom': 'React',
                    typescript: 'TypeScript',
                    tailwindcss: 'Tailwind CSS',
                    'framer-motion': 'Framer Motion',
                    gsap: 'GSAP',
                    lenis: 'Lenis',
                    mongoose: 'MongoDB',
                    mongodb: 'MongoDB',
                    express: 'Express.js',
                    firebase: 'Firebase',
                    'firebase-admin': 'Firebase',
                    stripe: 'Stripe',
                    'next-auth': 'NextAuth',
                    axios: 'Axios',
                    '@prisma/client': 'Prisma',
                    prisma: 'Prisma',
                    'socket.io': 'Socket.io',
                    'socket.io-client': 'Socket.io',
                    zod: 'Zod',
                    'react-query': 'React Query',
                    '@tanstack/react-query': 'React Query',
                    redux: 'Redux',
                    '@reduxjs/toolkit': 'Redux',
                    vite: 'Vite',
                    'react-icons': 'React Icons',
                    jsonwebtoken: 'JWT',
                };

                const seen = new Set<string>();
                for (const pkg of Object.keys(allDeps)) {
                    const display = techMap[pkg];
                    if (display && !seen.has(display)) {
                        seen.add(display);
                        techs.push(display);
                    }
                }

                // Max 6 techs
                techs = techs.slice(0, 6);
            }
        } catch {
            // Fallback to language if no package.json
        }

        // ── 3. Fallback — use repo language if no techs ──
        if (!techs.length && latest.language) {
            techs = [latest.language];
        }

        // ── 4. Get last commit message ────────────────────
        let lastCommit = '';
        try {
            const commitRes = await fetch(
                `https://api.github.com/repos/${GITHUB_USERNAME}/${latest.name}/commits?per_page=1`,
                { headers, next: { revalidate: 300 } }
            );
            if (commitRes.ok) {
                const commits = await commitRes.json();
                if (commits[0]?.commit?.message) {
                    lastCommit = commits[0].commit.message.split('\n')[0];
                }
            }
        } catch {
            // ignore
        }

        // ── 5. Time since last push ───────────────────────
        const pushedAt = new Date(latest.pushed_at);
        const diffMs = Date.now() - pushedAt.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        let timeAgo = '';
        if (diffMins < 60) timeAgo = `${diffMins}m ago`;
        else if (diffHours < 24) timeAgo = `${diffHours}h ago`;
        else timeAgo = `${diffDays}d ago`;

        return NextResponse.json({
            name: latest.name,
            description: latest.description || '',
            url: latest.html_url,
            techs,
            lastCommit,
            timeAgo,
            pushedAt: latest.pushed_at,
            language: latest.language || '',
            stars: latest.stargazers_count,
        });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}