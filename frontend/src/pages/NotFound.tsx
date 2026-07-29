// ══════════════════════════════════════════════════════════════
// GROUND ZERO - 404 Page
// ══════════════════════════════════════════════════════════════

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SeoHead from "../components/SeoHead";
import "../styles/pages/NotFound.scss";

const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <SeoHead
        title="Página no encontrada | Ground Zero Devs"
        description="La página que buscás no existe o fue movida."
        path="/404"
      />
      <motion.div
        className="not-found__content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src="/isotipo.png"
          alt="Ground Zero Devs"
          className="not-found__emblem"
          width={96}
          height={96}
        />
        <h1 className="not-found__code">404</h1>
        <p className="not-found__message">
          Esta página no existe o fue movida a otra zona.
        </p>
        <Link to="/" className="btn btn-primary">
          Volver al inicio
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
