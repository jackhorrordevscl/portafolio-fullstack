// ══════════════════════════════════════════════════════════════
// GROUND ZERO - Header Component
// ══════════════════════════════════════════════════════════════

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "../utils/config";
import "./Header.scss";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Detectar scroll para cambiar estilo del header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={`header ${isScrolled ? "header--scrolled" : ""}`}>
      <div className="header__container container">
        {/* Logo */}
        <Link to="/" className="header__logo">
          <div className="header__logo-symbol">
            <img src="/isotipo.png" alt="" width={40} height={40} />
          </div>
          <span className="header__logo-text">
            ground<span className="gradient-text">Zero</span>
          </span>
        </Link>

        {/* Navegación Desktop */}
        <nav className="header__nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`header__nav-link ${
                isActive(item.path) ? "header__nav-link--active" : ""
              }`}
            >
              {item.label}
              {isActive(item.path) && (
                <span className="header__nav-indicator" />
              )}
            </Link>
          ))}
        </nav>

        {/* Botón menú móvil */}
        <button
          className={`header__mobile-toggle ${
            isMobileMenuOpen ? "header__mobile-toggle--active" : ""
          }`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="header-mobile-menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Menú móvil */}
      <div
        id="header-mobile-menu"
        className={`header__mobile-menu ${
          isMobileMenuOpen ? "header__mobile-menu--open" : ""
        }`}
      >
        <nav className="header__mobile-nav">
          {navItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              className={`header__mobile-link ${
                isActive(item.path) ? "header__mobile-link--active" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay para cerrar menú móvil */}
      {isMobileMenuOpen && (
        <div
          className="header__overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
