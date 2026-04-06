// ══════════════════════════════════════════════════════════════
// GROUND ZERO - Home Page
// ══════════════════════════════════════════════════════════════

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowForward, Code, Rocket } from "@mui/icons-material";
import { userProfile, TEXTS } from "../utils/config";
import "../styles/pages/Home.scss";

const Home: React.FC = () => {
  return (
    <div className="home">
      {/* SECTION HERO */}
      <section className="hero">
        <div className="hero__container container">
          <div className="hero__content">
            {/* TEXTO PRINCIPAL */}
            <motion.div
              className="hero__text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="hero__greeting">{TEXTS.hero.greeting}</span>
              <h1 className="hero__name">{TEXTS.hero.name}</h1>
              <h2 className="hero__title">
                <span className="gradient-text">{TEXTS.hero.subtitle}</span>
              </h2>
              <div className="hero__subtitle">
                <Code className="hero__icon" />
                <span>{userProfile.title}</span>
              </div>
              <p className="hero__description">{userProfile.description}</p>

              {/* CTA */}
              <div className="hero__actions">
                <Link to="/projects" className="btn btn-primary">
                  <span>{TEXTS.hero.cta}</span>
                  <ArrowForward />
                </Link>
                <Link to="/contact" className="btn btn-outline">
                  <span>{TEXTS.hero.ctaSecondary}</span>
                </Link>
              </div>

              {/* STATS */}
              <div className="hero__stats">
                <div className="hero__stat">
                  <Rocket className="hero__stat-icon" />
                  <div className="hero__stat_content">
                    <span className="hero__stat-value gradient-text">5 + </span>
                    <span className="hero__stat-label">Proyectos</span>
                  </div>
                </div>
                <div className="hero__stat">
                  <Code className="hero__stat-icon" />
                  <div className="hero__stat-content">
                    <span className="hero__stat-value gradient-text">10</span>
                    <span className="hero__stat-label">Tecnologías</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Visual decorativo */}

            <motion.div
              className="hero__visual"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="hero__circle hero__circle--1" />
              <div className="hero__circle hero__circle--2" />
              <div className="hero__circle hero__circle--3" />
              <div className="hero__code-block">
                <div className="hero__code-header">
                  <span className="hero__code-dot" />
                  <span className="hero__code-dot" />
                  <span className="hero__code-dot" />
                </div>
                <div className="hero__code-content">
                  <code>
                    <span className="code-keyword">const</span>{" "}
                    <span className="code-variable">developer</span> = {"{\n"}{" "}
                    name:{" "}
                    <span className="code-string">'{userProfile.name}'</span>,
                    {"{\n"} role:{" "}
                    <span className="code-string">'{userProfile.title}'</span>
                    {"{\n"} passion: <span className="code-string">'Code'</span>
                    ,{"{\n"}
                    {"};"}
                  </code>
                </div>
              </div>
            </motion.div>
          </div>
          {/* Scroll indicator */}
          <motion.div
            className="hero__scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <span>Scroll</span>
            <div className="hero__scroll-line" />
          </motion.div>
        </div>

        {/* Background decoration */}
        <div className="hero__bg-decoration" />
      </section>
    </div>
  );
};

export default Home;
