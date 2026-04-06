// ══════════════════════════════════════════════════════════════
// GROUND ZERO - Footer Component
// ══════════════════════════════════════════════════════════════

import React from 'react';
import { Link } from 'react-router-dom';
import { GitHub, LinkedIn, Instagram } from '@mui/icons-material';
import { userProfile, navItems } from '../utils/config';
import './Footer.scss';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      url: userProfile.github,
      icon: <GitHub />,
    },
    {
      name: 'LinkedIn',
      url: userProfile.linkedin,
      icon: <LinkedIn />,
    },
    {
      name: 'Instagram',
      url: userProfile.instagram,
      icon: <Instagram />,
    },
  ].filter(link => link.url); // Filtrar solo los que tienen URL

  return (
    <footer className="footer">
      <div className="footer__container container">
        {/* Grid principal */}
        <div className="footer__grid">
          {/* Columna 1: Branding */}
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer__logo-symbol">
                <svg width="32" height="32" viewBox="0 0 40 40">
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    fill="none"
                    stroke="url(#footer-gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="90 10"
                    strokeDashoffset="5"
                  />
                  <circle cx="20" cy="8" r="2" fill="#C8F542" />
                  <defs>
                    <linearGradient id="footer-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#C8F542" />
                      <stop offset="100%" stopColor="#42F5D4" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="footer__logo-text">
                ground<span className="gradient-text">Zero</span>
              </span>
            </div>
            <p className="footer__tagline">
              Desarrollando soluciones modernas<br />
              con tecnologías de vanguardia
            </p>
          </div>

          {/* Columna 2: Navegación rápida */}
          <div className="footer__links">
            <h3 className="footer__title">Navegación</h3>
            <nav className="footer__nav">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="footer__nav-link"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Columna 3: Contacto */}
          <div className="footer__contact">
            <h3 className="footer__title">Contacto</h3>
            <div className="footer__contact-info">
              <a 
                href={`mailto:${userProfile.email}`}
                className="footer__contact-link"
              >
                {userProfile.email}
              </a>
              <p className="footer__location">{userProfile.location}</p>
            </div>
          </div>

          {/* Columna 4: Redes sociales */}
          <div className="footer__social">
            <h3 className="footer__title">Sígueme</h3>
            <div className="footer__social-links">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-link"
                  aria-label={link.name}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="footer__divider" />

        {/* Bottom */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} {userProfile.name}. Todos los derechos reservados.
          </p>
          <div className="footer__tech">
            <span>Construido con</span>
            <span className="gradient-text">React</span>
            <span>+</span>
            <span className="gradient-text">TypeScript</span>
            <span>+</span>
            <span className="gradient-text">NestJS</span>
          </div>
        </div>
      </div>

      {/* Dot grid decorativo */}
      <div className="footer__decoration" />
    </footer>
  );
};

export default Footer;
