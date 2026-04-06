// ══════════════════════════════════════════════════════════════
// GROUND ZERO - Definiciones de Tipos TypeScript
// ══════════════════════════════════════════════════════════════

import type React from "react";
import type { MessageKey } from "./messages";

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
}

export interface ContactFormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

export interface ContactResponse {
    success: boolean;
    messages: MessageKey[];
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
    avatar?: string;
    resume?: string;
}

// ────────────────────────────────────────────────────────────
// Skills Types
// ────────────────────────────────────────────────────────────

export interface Skill {
    name: string;
    level: number; // 0-100
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
// Experience Types
// ────────────────────────────────────────────────────────────

export interface Experience {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string | null;
    description?: string;
    location?: string;
    gpa?: string;
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

// ────────────────────────────────────────────────────────────
// API Response Types
// ────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
    error?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

// ────────────────────────────────────────────────────────────
// Theme Types
// ────────────────────────────────────────────────────────────

export type ThemeMode = 'light' | 'dark';

export interface ThemeConfig {
    mode: ThemeMode;
    primaryColor: string;
    secondaryColor: string;
}

// ────────────────────────────────────────────────────────────
// Component Props Types
// ────────────────────────────────────────────────────────────

export interface BaseComponentProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export interface SectionProps extends BaseComponentProps {
    id?: string;
    title?: string;
    subtitle?: string;
}
