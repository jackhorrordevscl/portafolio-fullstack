// ══════════════════════════════════════════════════════════════
// GROUND ZERO - Footer Component
// ══════════════════════════════════════════════════════════════

import React from 'react';
import { Link } from 'react-router-dom';
import { GitHub, LinkedIn } from '@mui/icons-material';
import { brandProfile, navItems } from '../utils/config';
import './Footer.scss';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      url: brandProfile.github,
      icon: <GitHub />,
    },
    {
      name: 'LinkedIn',
      url: brandProfile.linkedin,
      icon: <LinkedIn />,
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
                <img src="/isotipo.png" alt="" width={32} height={32} />
              </div>
              <span className="footer__logo-text">
                ground<span className="gradient-text">Zero</span>
              </span>
            </div>
            <p className="footer__tagline">
              Código con impacto<br />
              Desarrollo desde la zona cero
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
                href={`mailto:${brandProfile.email}`}
                className="footer__contact-link"
              >
                {brandProfile.email}
              </a>
              <p className="footer__location">{brandProfile.location}</p>
            </div>
          </div>

          {/* Columna 4: Redes sociales */}
          <div className="footer__social">
            <h3 className="footer__title">Síguenos</h3>
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
            © {currentYear} {brandProfile.name}. Todos los derechos reservados.
          </p>
          <div className="footer__tech">
            <span>Construido con</span>
            <span className="gradient-text">React</span>
            <span>+</span>
            <span className="gradient-text">Vite</span>
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
