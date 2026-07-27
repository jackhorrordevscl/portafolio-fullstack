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
        // GitHub does not set CORS headers to allow credentialed requests from
        // arbitrary origins. Ensure we do not send credentials on this cross-
        // origin request to avoid the browser blocking the response.
        withCredentials: false,
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

