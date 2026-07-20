// ══════════════════════════════════════════════════════════════
// GROUND ZERO - About Page
// ══════════════════════════════════════════════════════════════

import React from "react";
import { motion } from "framer-motion";
import { Code, School, Work, LocationOn } from "@mui/icons-material";
import { userProfile, skillGroups, TEXTS } from "../utils/config";
import "../styles/pages/About.scss";

const About: React.FC = () => {
  return (
    <div className="about">
      <div className="about__container container">
        {/* Header */}
        <motion.div
          className="about__header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="about__title">{TEXTS.about.title}</h1>
          <div className="accent-bar accent-bar--centered" />
        </motion.div>

        {/* Profile Section */}
        <motion.section
          className="about__profile"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="about__profile-content">
            <div className="about__avatar">
              <div className="about__avatar-placeholder">
                <Code className="about__avatar-icon" />
              </div>
              <div className="about__avatar-ring" />
            </div>

            <div className="about__info">
              <h2 className="about__name">{userProfile.name}</h2>
              <p className="about__role gradient-text">{userProfile.title}</p>

              <div className="about__meta">
                <div className="about__meta-item">
                  <LocationOn fontSize="small" />
                  <span>{userProfile.location}</span>
                </div>
                <div className="about__meta-item">
                  <Work fontSize="small" />
                  <span>Fullstack Developer</span>
                </div>
              </div>

              <p className="about__description">{TEXTS.about.content}</p>

              <div className="about__social">
                <a
                  href={userProfile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about__social-link"
                >
                  <svg
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
                {userProfile.linkedin && (
                  <a
                    href={userProfile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about__social-link"
                  >
                    <svg
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          className="about__skills"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="about__section-title">
            <Code className="about__section-icon" />
            Habilidades Técnicas
          </h2>

          <div className="about__skills-grid">
            {skillGroups.map((group, groupIndex) => (
              <motion.div
                key={group.category}
                className="skill-group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + groupIndex * 0.1 }}
              >
                <h3 className="skill-group__title">{group.title}</h3>
                <div className="skill-group__items">
                  {group.skills.map((skill) => (
                    <div key={skill.name} className="skill-item">
                      <div className="skill-item__header">
                        <span className="skill-item__name">{skill.name}</span>
                        <span className="skill-item__level">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="skill-item__bar">
                        <motion.div
                          className="skill-item__progress"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{
                            duration: 1,
                            delay: 0.7 + groupIndex * 0.1,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Experience Timeline (placeholder) */}
        <motion.section
          className="about__timeline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="about__section-title">
            <Work className="about__section-icon" />
            Experiencia
          </h2>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-item__marker" />
              <div className="timeline-item__content">
                <h3 className="timeline-item__title">
                  Desarrollador Fullstack
                </h3>
                <p className="timeline-item__company">Proyectos Freelance</p>
                <p className="timeline-item__period">2023 - Presente</p>
                <p className="timeline-item__description">
                  Desarrollo de aplicaciones web con React, Node.js y
                  arquitecturas modernas. Implementación de soluciones
                  escalables y mantenibles.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-item__marker" />
              <div className="timeline-item__content">
                <h3 className="timeline-item__title">Analista Programador</h3>
                <p className="timeline-item__company">Desarrollo de Software</p>
                <p className="timeline-item__period">2021 - 2023</p>
                <p className="timeline-item__description">
                  Análisis, diseño e implementación de soluciones tecnológicas.
                  Trabajo con múltiples tecnologías y frameworks.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Education */}
        <motion.section
          className="about__education"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="about__section-title">
            <School className="about__section-icon" />
            Educación
          </h2>

          <div className="education-grid">
            <div className="education-card">
              <School className="education-card__icon" />
              <h3 className="education-card__title">Desarrollo de Software</h3>
              <p className="education-card__institution">Formación Técnica</p>
              <p className="education-card__description">
                Especialización en desarrollo fullstack con énfasis en
                tecnologías web modernas.
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
