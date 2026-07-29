// ══════════════════════════════════════════════════════════════
// GROUND ZERO - App Component
// ══════════════════════════════════════════════════════════════

import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, LinearProgress } from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/route-fallback.scss";

const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const RouteFallback: React.FC = () => (
  <>
    <Box sx={{ position: "fixed", left: 0, right: 0, top: 0, zIndex: 6000 }}>
      <LinearProgress color="primary" />
    </Box>
    <div className="route-fallback">
      <img
        src="/isotipo.png"
        alt=""
        className="route-fallback__emblem"
        width={72}
        height={72}
      />
    </div>
  </>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
