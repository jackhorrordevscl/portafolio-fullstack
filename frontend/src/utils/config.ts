// ══════════════════════════════════════════════════════════════
// GROUND ZERO - Configuración de Datos Personales
// ══════════════════════════════════════════════════════════════

import type { UserProfile, NavItem, SkillGroup } from "../types";

// ────────────────────────────────────────────────────────────
// Identidad de Marca (Ground Zero Devs) — usada en Home, Header,
// Footer y Contact. La página About es la única sección autoreferente.
// ────────────────────────────────────────────────────────────
export const brandProfile: UserProfile = {
  name: "Ground Zero Devs",
  title: "Desarrollo desde la zona cero",
  description:
    "Estudio de desarrollo fullstack enfocado en llevar productos digitales desde la idea hasta producción. Combinamos ejecución ágil con arquitectura sólida para construir APIs, MVPs y plataformas web escalables, usando un stack moderno basado en React, Node.js y NestJS.",
  email: "jmartinez@groundzerodevs.com",
  location: "Santiago, Chile",
  github: "https://github.com/jackhorrordevscl",
  linkedin: "https://www.linkedin.com/in/groundzerodevs",
};

// ────────────────────────────────────────────────────────────
// Información Personal (solo usada en About)
// ────────────────────────────────────────────────────────────
export const userProfile: UserProfile = {
  name: "Juan José Martínez",
  title: "Analista Programador",
  description:
    "Desarrollo aplicaciones web desde la idea hasta producción, combinando ejecución ágil con arquitectura sólida. Me enfoco en APIs y MVPs funcionales, trabajando de forma iterativa y en constante comunicación para asegurar resultados alineados a necesidades reales. Utilizo tecnologías modernas como React, Next.js y Node.js para crear soluciones escalables y listas para crecer.",
  email: "jmartinezc.cp@gmail.com",
  location: "Santiago, Chile",
  github: "https://github.com/jackhorrordevscl",
  linkedin: "https://www.linkedin.com/in/groundzerodevs",
  instagram: "https://www.instagram.com/jackhorror_/",
};

// ────────────────────────────────────────────────────────────
// Navegación
// ────────────────────────────────────────────────────────────
export const navItems: NavItem[] = [
  { label: "Inicio", path: "/" },
  { label: "Sobre Mí", path: "/about" },
  { label: "Proyectos", path: "/projects" },
  { label: "Contacto", path: "/contact" },
];

// ────────────────────────────────────────────────────────────
// Skills y Tecnologías
// ────────────────────────────────────────────────────────────
export const skillGroups: SkillGroup[] = [
  {
    category: "frontend",
    title: "Frontend",
    skills: [
      { name: "React", category: "frontend" },
      { name: "TypeScript", category: "frontend" },
      { name: "Next.js", category: "frontend" },
      { name: "Astro", category: "frontend" },
      { name: "Vite", category: "frontend" },
      { name: "React Router", category: "frontend" },
      { name: "TanStack Query", category: "frontend" },
      { name: "Framer Motion", category: "frontend" },
      { name: "Tailwind CSS", category: "frontend" },
      { name: "Material UI", category: "frontend" },
      { name: "SCSS/Sass", category: "frontend" },
    ],
  },
  {
    category: "backend",
    title: "Backend",
    skills: [
      { name: "Node.js", category: "backend" },
      { name: "NestJS", category: "backend" },
      { name: "Prisma", category: "backend" },
      { name: "REST APIs", category: "backend" },
      { name: "JWT / Passport", category: "backend" },
      { name: "class-validator", category: "backend" },
      { name: "Helmet", category: "backend" },
      { name: "Resend", category: "backend" },
    ],
  },
  {
    category: "database",
    title: "Bases de Datos",
    skills: [{ name: "PostgreSQL", category: "database" }],
  },
  {
    category: "devops",
    title: "DevOps & Testing",
    skills: [
      { name: "Docker", category: "devops" },
      { name: "Git/GitHub", category: "devops" },
      { name: "Vercel", category: "devops" },
      { name: "Render", category: "devops" },
      { name: "Playwright", category: "devops" },
      { name: "Jest", category: "devops" },
    ],
  },
];

// ────────────────────────────────────────────────────────────
// Configuración de GitHub API
// ────────────────────────────────────────────────────────────
export const githubConfig = {
  username: "jackhorrordevscl",
  apiUrl: "https://api.github.com",
  reposEndpoint: "/users/jackhorrordevscl/repos",
  // Repositorios destacados (opcional - para mostrar primero)
  featuredRepos: [
    'control-fichas',
  ] as string[],
};

// ────────────────────────────────────────────────────────────
// Configuración de API Backend
// ────────────────────────────────────────────────────────────
export const apiConfig = {
  // Desarrollo local
  development: {
    baseUrl: import.meta.env.VITE_API_URL,
  },
  // Producción
  production: {
    baseUrl: import.meta.env.VITE_API_URL, // Actualizar cuando deploys
  },
};

// Helper para obtener la URL base según el entorno
export const getApiBaseUrl = (): string => {
  const isDevelopment = import.meta.env.DEV;
  return isDevelopment
    ? apiConfig.development.baseUrl
    : apiConfig.production.baseUrl;
};

// ────────────────────────────────────────────────────────────
// Constantes de la aplicación
// ────────────────────────────────────────────────────────────
export const APP_CONFIG = {
  title: "Ground Zero Devs | Código con impacto",
  description:
    "Ground Zero Devs - Estudio de desarrollo fullstack. Desarrollo desde la zona cero.",
  keywords:
    "ground zero devs, desarrollo fullstack, react, nodejs, typescript, nestjs, estudio de software, chile",
  siteUrl: "https://portafolio-fullstack-sage.vercel.app/", // Actualizar cuando deploys
  socialImage: "/og-image.png", // Agregar imagen después
};

// ────────────────────────────────────────────────────────────
// Textos de secciones
// ────────────────────────────────────────────────────────────
export const TEXTS = {
  hero: {
    greeting: "Bienvenido a",
    name: "Ground Zero Devs",
    title: "Desarrollo desde la zona cero",
    subtitle: "Código con impacto",
    cta: "Ver Proyectos",
    ctaSecondary: "Contactar",
  },
  about: {
    title: "Sobre Mí",
    content: `Soy desarrollador fullstack enfocado en crear aplicaciones web funcionales desde la idea inicial hasta su despliegue en producción. Trabajo construyendo dashboards, APIs y MVPs, priorizando siempre que el producto sea útil, escalable y esté listo para evolucionar.
    
    Mi forma de trabajar se basa en la ejecución ágil y la comunicación constante. Me involucro activamente durante todo el proceso, asegurando que cada avance esté alineado con lo que realmente necesitas. No se trata solo de desarrollar, sino de construir una solución que tenga sentido en la práctica y pueda usarse desde el primer momento.
    
    Elijo el stack según lo que pide el proyecto: React, Next.js o Astro en el frontend, Node.js con NestJS en el backend, y PostgreSQL con Prisma cuando necesito persistencia real. Despliego con Docker en Vercel y Render, y no dejo afuera lo que no se ve a simple vista: autenticación, testing y seguridad.
    
    Estoy disponible para nuevos proyectos y colaboraciones.`,
  },
  projects: {
    title: "Proyectos",
    subtitle: "Mis trabajos recientes",
    loading: "Cargando proyectos...",
    error: "Error al cargar proyectos",
    empty: "No hay proyectos disponibles",
    viewCode: "Ver Código",
    viewDemo: "Ver Demo",
  },
  contact: {
    title: "Contacto",
    subtitle: "¿Tienes un proyecto en mente? ¡Hablemos!",
    form: {
      name: "Nombre",
      email: "Email",
      subject: "Asunto",
      message: "Mensaje",
      submit: "Enviar Mensaje",
      sending: "Enviando...",
    },
  },
};

