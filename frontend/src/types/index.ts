// ══════════════════════════════════════════════════════════════
// GROUND ZERO - Definiciones de Tipos TypeScript
// ══════════════════════════════════════════════════════════════

// ────────────────────────────────────────────────────────────
// GitHub Types
// ────────────────────────────────────────────────────────────

export interface GitHubRepository {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    topics: string[];
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    size: number;
    default_branch: string;
    open_issues_count: number;
    visibility: string;
    fork: boolean;
    archived: boolean;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    imageUrl?: string;
    demoUrl?: string;
    githubUrl: string;
    technologies: string[];
    stars: number;
    forks: number;
    language: string;
    featured?: boolean;
    createdAt: string;
    updatedAt: string;
}

// ────────────────────────────────────────────────────────────
// Contact Types
// ────────────────────────────────────────────────────────────

export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
    website?: string; // honeypot anti-spam: debe quedar siempre vacío
}

// ────────────────────────────────────────────────────────────
// User Profile Types
// ────────────────────────────────────────────────────────────

export interface UserProfile {
    name: string;
    title: string;
    description: string;
    email: string;
    location: string;
    github: string;
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    website?: string;
    whatsapp?: string;
    avatar?: string;
    resume?: string;
}

// ────────────────────────────────────────────────────────────
// Skills Types
// ────────────────────────────────────────────────────────────

export interface Skill {
    name: string;
    category: SkillCategory;
    icon?: string;
}

export type SkillCategory =
    | 'frontend'
    | 'backend'
    | 'database'
    | 'devops'
    | 'tools'
    | 'other';

export interface SkillGroup {
    category: SkillCategory;
    title: string;
    skills: Skill[];
}

// ────────────────────────────────────────────────────────────
// Navigation Types
// ────────────────────────────────────────────────────────────

export interface NavItem {
    label: string;
    path: string;
    icon?: string;
    external?: boolean;
}

