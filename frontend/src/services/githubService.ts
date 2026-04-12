// ══════════════════════════════════════════════════════════════
// GROUND ZERO - Servicio de GitHub API
// ══════════════════════════════════════════════════════════════

import { httpClient } from "./httpClient";
import type { GitHubRepository, Project } from "../types";
import { githubConfig } from "../utils/config";

// NOTE:
// We reuse the central `httpClient` instance so requests participate in
// the global loading indicator and standardized error handling. For the
// GitHub API we call the full URL and pass the required `Accept` header.

// ────────────────────────────────────────────────────────────
// Funciones del Servicio
// ────────────────────────────────────────────────────────────

/**
 * Obtiene todos los repositorios públicos del usuario
 */
export const fetchGitHubRepositories = async (): Promise<
  GitHubRepository[]
> => {
  try {
    const response = await httpClient.get<GitHubRepository[]>(
      // full URL to call GitHub's API (httpClient will still run interceptors)
      `${githubConfig.apiUrl}${githubConfig.reposEndpoint}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        params: {
          sort: "updated",
          direction: "desc",
          per_page: 100,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);
    throw new Error("No se pudieron cargar los repositorios de GitHub");
  }
};

/**
 * Transforma un repositorio de GitHub en un proyecto para el portafolio
 */
export const transformRepoToProject = (repo: GitHubRepository): Project => {
  // Crear array de tecnologías
  const technologies: string[] = repo.topics || [];
  if (repo.language) {
    technologies.push(repo.language);
  }

  return {
    id: repo.id,
    title: repo.name,
    description: repo.description || "Sin descripción disponible",
    githubUrl: repo.html_url,
    demoUrl: repo.homepage || undefined,
    technologies: technologies,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language || "Unknown",
    featured: githubConfig.featuredRepos.includes(repo.name),
    createdAt: repo.created_at,
    updatedAt: repo.updated_at,
  };
};

/**
 * Obtiene los proyectos filtrados y transformados
 * @param excludeForks - Si debe excluir repositorios forkeados
 * @param excludeArchived - Si debe excluir repositorios archivados
 */
export const fetchProjects = async (
  excludeForks: boolean = true,
  excludeArchived: boolean = true,
): Promise<Project[]> => {
  try {
    const repos = await fetchGitHubRepositories();

    // Filtrar repositorios
    let filteredRepos = repos;

    if (excludeForks) {
      filteredRepos = filteredRepos.filter((repo) => !repo.fork);
    }

    if (excludeArchived) {
      filteredRepos = filteredRepos.filter((repo) => !repo.archived);
    }

    // Transformar a proyectos
    const projects = filteredRepos.map(transformRepoToProject);

    // Ordenar: destacados primero, luego por estrellas
    projects.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.stars - a.stars;
    });

    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

/**
 * Obtiene un proyecto específico por ID
 */
export const fetchProjectById = async (id: number): Promise<Project | null> => {
  try {
    const projects = await fetchProjects();
    return projects.find((project) => project.id === id) || null;
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    return null;
  }
};

/**
 * Obtiene solo los proyectos destacados
 */
export const fetchFeaturedProjects = async (): Promise<Project[]> => {
  try {
    const projects = await fetchProjects();
    return projects.filter((project) => project.featured);
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return [];
  }
};

/**
 * Busca proyectos por tecnología
 */
export const searchProjectsByTechnology = async (
  technology: string,
): Promise<Project[]> => {
  try {
    const projects = await fetchProjects();
    const lowerTech = technology.toLowerCase();

    return projects.filter(
      (project) =>
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(lowerTech),
        ) || project.language.toLowerCase().includes(lowerTech),
    );
  } catch (error) {
    console.error("Error searching projects by technology:", error);
    return [];
  }
};

// ────────────────────────────────────────────────────────────
// Utilidades
// ────────────────────────────────────────────────────────────

/**
 * Obtiene la URL de la imagen del proyecto
 * Usa la imagen del repositorio si existe, sino usa un placeholder
 */
export const getProjectImageUrl = (project: Project): string => {
  // Si el proyecto tiene una imagen en el README o en algún lugar, usarla
  // Por ahora retornamos un placeholder basado en el lenguaje
  const languageColors: Record<string, string> = {
    JavaScript: "#f7df1e",
    TypeScript: "#3178c6",
    Python: "#3776ab",
    Java: "#007396",
    Go: "#00add8",
    Rust: "#dea584",
    default: "#6e7681",
  };

  const color = languageColors[project.language] || languageColors.default;

  return `https://via.placeholder.com/400x250/${color.slice(1)}/ffffff?text=${encodeURIComponent(project.title)}`;
};

/**
 * Formatea la fecha de actualización
 */
export const formatProjectDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Hoy";
  if (diffDays === 1) return "Ayer";
  if (diffDays < 7) return `Hace ${diffDays} días`;
  if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
  if (diffDays < 365) return `Hace ${Math.floor(diffDays / 30)} meses`;
  return `Hace ${Math.floor(diffDays / 365)} años`;
};
