// ══════════════════════════════════════════════════════════════
// GROUND ZERO - Configuración de Datos Personales
// ══════════════════════════════════════════════════════════════

import type { UserProfile, NavItem, SkillGroup } from "../types";

// ────────────────────────────────────────────────────────────
// Información Personal
// ────────────────────────────────────────────────────────────
export const userProfile: UserProfile = {
  name: "Juan José Martínez",
  title: "Analista Programador",
  description:
    "Desarrollador fullstack especializado en React, Node.js y arquitecturas modernas. Apasionado por crear soluciones escalables y experiencias de usuario excepcionales. Con experiencia en tecnologías cloud y containerización, transformo ideas en productos funcionales y mantenibles.",
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
  { label: "Proyectos", path: "/projects" },
  { label: "Sobre Mí", path: "/about" },
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
      { name: "React", level: 90, category: "frontend" },
      { name: "TypeScript", level: 85, category: "frontend" },
      { name: "Next.js", level: 80, category: "frontend" },
      { name: "HTML5/CSS3", level: 95, category: "frontend" },
      { name: "SCSS/Sass", level: 85, category: "frontend" },
      { name: "Tailwind CSS", level: 80, category: "frontend" },
      { name: "Material-UI", level: 75, category: "frontend" },
    ],
  },
  {
    category: "backend",
    title: "Backend",
    skills: [
      { name: "Node.js", level: 85, category: "backend" },
      { name: "Express", level: 85, category: "backend" },
      { name: "NestJS", level: 80, category: "backend" },
      { name: "REST APIs", level: 90, category: "backend" },
      { name: "GraphQL", level: 70, category: "backend" },
    ],
  },
  {
    category: "database",
    title: "Bases de Datos",
    skills: [
      { name: "PostgreSQL", level: 80, category: "database" },
      { name: "MongoDB", level: 75, category: "database" },
      { name: "MySQL", level: 75, category: "database" },
      { name: "Redis", level: 65, category: "database" },
    ],
  },
  {
    category: "devops",
    title: "DevOps & Cloud",
    skills: [
      { name: "Docker", level: 85, category: "devops" },
      { name: "Git/GitHub", level: 90, category: "devops" },
      { name: "Google Cloud", level: 70, category: "devops" },
      { name: "Vercel", level: 80, category: "devops" },
      { name: "CI/CD", level: 75, category: "devops" },
    ],
  },
  {
    category: "tools",
    title: "Herramientas",
    skills: [
      { name: "VS Code", level: 95, category: "tools" },
      { name: "Postman", level: 85, category: "tools" },
      { name: "Figma", level: 70, category: "tools" },
      { name: "Linux/Ubuntu", level: 85, category: "tools" },
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
    baseUrl: "http://localhost:3000/api",
  },
  // Producción
  production: {
    baseUrl: "https://tu-backend.cloud.run/api", // Actualizar cuando deploys
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
  title: "Juan José Martínez | Analista Programador",
  description:
    "Portafolio profesional de Juan José Martínez - Desarrollador Fullstack",
  keywords: "react, nodejs, typescript, fullstack, desarrollador, portfolio",
  siteUrl: "https://tudominio.com", // Actualizar cuando deploys
  socialImage: "/og-image.png", // Agregar imagen después
};

// ────────────────────────────────────────────────────────────
// Textos de secciones
// ────────────────────────────────────────────────────────────
export const TEXTS = {
  hero: {
    greeting: "Hola, soy",
    name: "Juan José Martínez",
    title: "Analista Programador",
    subtitle: "Fullstack Developer",
    cta: "Ver Proyectos",
    ctaSecondary: "Contactar",
  },
  about: {
    title: "Sobre Mí",
    content: `Soy un desarrollador fullstack con pasión por crear soluciones tecnológicas 
    innovadoras y escalables. Mi experiencia abarca desde el desarrollo frontend con React 
    hasta arquitecturas backend robustas con Node.js y NestJS.
    
    Me especializo en transformar ideas complejas en aplicaciones funcionales, mantenibles 
    y con excelente experiencia de usuario. Siempre estoy aprendiendo nuevas tecnologías 
    y mejores prácticas para mantenerme actualizado en el ecosistema JavaScript/TypeScript.`,
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
    success: "¡Mensaje enviado con éxito! Te responderé pronto.",
    error: "Error al enviar el mensaje. Intenta nuevamente.",
  },
};

