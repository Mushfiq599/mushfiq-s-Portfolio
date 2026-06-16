export interface Project {
    title: string;
    description: string;
    detailedDescription: string;
    technologies: string[];
    github: string;
    live: string;
    image: string;
    challenges: string[];
    improvements: string[];
}

export interface SkillCategory {
    title: string;
    icon: string;
    skills: string[];
}

export interface Education {
    degree: string;
    institution: string;
    period: string;
    description: string;
    grade?: string;
}

export interface Experience {
    title: string;
    company: string;
    period: string;
    description: string[];
    technologies: string[];
}

export interface NavItem {
    label: string;
    href: string;
}

export interface SocialLink {
    label: string;
    href: string;
    icon: string;
}