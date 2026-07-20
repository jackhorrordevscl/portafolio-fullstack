
// ══════════════════════════════════════════════════════════════
// GROUND ZERO - Projects Page
// ══════════════════════════════════════════════════════════════

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GitHub, OpenInNew, Star, CallSplit } from '@mui/icons-material';
import { fetchProjects } from '../services/githubService';
import { TEXTS } from '../utils/config';
import type { Project } from '../types';
import '../styles/pages/Projects.scss';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [showAllTechFilters, setShowAllTechFilters] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProjects();
      setProjects(data);
    } catch (err) {
      setError(TEXTS.projects.error);
      console.error('Error loading projects:', err);
    } finally {
      setLoading(false);
    }
  };

  // Obtener todas las tecnologías únicas
  const allTechnologies = Array.from(
    new Set(projects.flatMap(p => p.technologies))
  ).sort();
  const visibleTechFilters = showAllTechFilters
    ? allTechnologies
    : allTechnologies.slice(0, 5);
  const hiddenTechFilterCount = allTechnologies.length - visibleTechFilters.length;

  // Filtrar proyectos por tecnología
  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.technologies.includes(filter));

  return (
    <div className="projects">
      <div className="projects__container container">
        {/* Header */}
        <motion.div
          className="projects__header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="projects__title">{TEXTS.projects.title}</h1>
          <p className="projects__subtitle">{TEXTS.projects.subtitle}</p>
          <div className="accent-bar accent-bar--centered" />
        </motion.div>

        {/* Filtros */}
        {!loading && !error && (
          <motion.div
            className="projects__filters"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button
              className={`projects__filter ${filter === "all" ? "projects__filter--active" : ""}`}
              onClick={() => setFilter("all")}
            >
              Todos ({projects.length})
            </button>
            {visibleTechFilters.map((tech) => (
              <button
                key={tech}
                className={`projects__filter ${filter === tech ? "projects__filter--active" : ""}`}
                onClick={() => setFilter(tech)}
              >
                {tech}
              </button>
            ))}
            {hiddenTechFilterCount > 0 && (
              <button
                className="projects__filter projects__filter--more"
                onClick={() => setShowAllTechFilters(true)}
              >
                +{hiddenTechFilterCount} más
              </button>
            )}
            {showAllTechFilters && allTechnologies.length > 5 && (
              <button
                className="projects__filter projects__filter--more"
                onClick={() => setShowAllTechFilters(false)}
              >
                Ver menos
              </button>
            )}
          </motion.div>
        )}

        {/* Loading */}
        {loading && (
          <div className="projects__loading">
            <div className="projects__spinner" />
            <p>{TEXTS.projects.loading}</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="projects__error">
            <p>{error}</p>
            <button className="btn btn-primary" onClick={loadProjects}>
              Reintentar
            </button>
          </div>
        )}

        {/* Grid de proyectos */}
        {!loading && !error && (
          <motion.div
            className="projects__grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {filteredProjects.length === 0 ? (
              <p className="projects__empty">{TEXTS.projects.empty}</p>
            ) : (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className={`project-card ${project.featured ? 'project-card--featured' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {project.featured && (
                    <div className="project-card__badge">Destacado</div>
                  )}

                  <div className="project-card__header">
                    <h3 className="project-card__title">{project.title}</h3>
                    <div className="project-card__stats">
                      <span className="project-card__stat">
                        <Star fontSize="small" />
                        {project.stars}
                      </span>
                      <span className="project-card__stat">
                        <CallSplit fontSize="small" />
                        {project.forks}
                      </span>
                    </div>
                  </div>

                  <p className="project-card__description">
                    {project.description}
                  </p>

                  <div className="project-card__technologies">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="project-card__tech">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="project-card__tech project-card__tech--more">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="project-card__actions">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-card__link"
                    >
                      <GitHub fontSize="small" />
                      {TEXTS.projects.viewCode}
                    </a>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-card__link project-card__link--primary"
                      >
                        <OpenInNew fontSize="small" />
                        {TEXTS.projects.viewDemo}
                      </a>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Projects;
