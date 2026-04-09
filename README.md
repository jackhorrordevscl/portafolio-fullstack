<div align="center">

# ⚡ Ground Zero Development

### Portafolio Fullstack Profesional

[![License: MIT](https://img.shields.io/badge/License-MIT-C8F542?style=for-the-badge)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-20.20.1-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![NestJS](https://img.shields.io/badge/NestJS-11.0.1-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[![Frontend](https://img.shields.io/badge/Frontend-95%25%20Completado-C8F542?style=flat-square)](frontend/)
[![Backend](https://img.shields.io/badge/Backend-En%20Desarrollo-42F5D4?style=flat-square)](backend/)
[![Estado](https://img.shields.io/badge/Estado-Alpha%20v0.6.1-orange?style=flat-square)]()

</div>

---

## 🌐 Demo

> **Próximamente** — Deploy planificado en Vercel (frontend) y Google Cloud Run (backend).

---

## 📖 Descripción

**Ground Zero Development** es el portafolio profesional de **Juan José Martínez**, Analista Programador y desarrollador fullstack con sede en Santiago, Chile. El proyecto está construido como un monorepo que incluye un frontend moderno en **React + TypeScript** y una API backend en **NestJS**.

El diseño sigue una identidad visual técnica, moderna y oscura con acentos neón (Lime `#C8F542` y Cyan `#42F5D4`), reflejando un enfoque profesional y orientado a producción.

**Características principales:**
- Visualización dinámica de repositorios desde GitHub API
- Formulario de contacto con envío real vía SMTP (Gmail)
- Pipeline de errores tipado con claves semánticas (`MessageKey`)
- Protección XSS y rate limiting en el backend
- Animaciones fluidas con Framer Motion

---

## 🛠️ Stack Técnico

### Frontend

| Tecnología | Versión | Rol |
|------------|---------|-----|
| React | 19.2.4 | UI Library |
| TypeScript | 5.9.3 | Tipado estático |
| Vite | 8.0.1 | Build tool (puerto 5173) |
| React Router DOM | 7.13.2 | Enrutamiento SPA |
| Material-UI (MUI) | 7.3.9 | Componentes de UI |
| Framer Motion | 12.38.0 | Animaciones |
| Axios | 1.14.0 | Cliente HTTP con interceptores |
| SCSS / Sass | 1.98.0 | Estilos modulares |

### Backend

| Tecnología | Versión | Rol |
|------------|---------|-----|
| NestJS | 11.0.1 | Framework principal |
| TypeScript | 5.7.3 | Tipado estático |
| @nestjs/config | 4.0.3 | Variables de entorno |
| @nestjs-modules/mailer | 2.3.4 | Envío de emails (Nodemailer) |
| Nodemailer | 8.0.5 | Transporte SMTP |
| class-validator | 0.15.1 | Validación de DTOs |
| class-transformer | 0.5.1 | Transformación de datos |
| sanitize-html | 2.17.2 | Prevención XSS |
| @nestjs/throttler | 6.5.0 | Rate limiting |

---

## 🗂️ Estructura del Monorepo

```
portafolio-fullstack/
│
├── frontend/                     # Aplicación React + TypeScript
│   └── src/
│       ├── pages/                # Vistas principales (Home, Projects, About, Contact)
│       ├── components/           # Header, Footer
│       ├── services/             # httpClient.ts, contactService.ts, githubService.ts
│       ├── utils/
│       │   ├── config.ts         # Single source of truth (datos personales, constantes)
│       │   └── errorMapper.ts    # Mapper de errores: error crudo → MessageKey[]
│       ├── types/
│       │   ├── index.ts          # Interfaces globales (UserProfile, SkillGroup, etc.)
│       │   ├── messages.ts       # Tipo MessageKey (unión de claves válidas)
│       │   └── http.ts           # Tipo HttpError (contrato de error HTTP)
│       ├── i18n/
│       │   └── messages.ts       # Diccionario localizado: MessageKey → texto UI
│       └── styles/
│           ├── _variables.scss   # Variables de diseño centralizadas
│           ├── global.scss
│           └── pages/            # SCSS modularizado por página
│
└── backend/                      # API REST en NestJS
    └── src/
        ├── app.module.ts         # Módulo raíz (ConfigModule, ThrottlerModule)
        ├── main.ts               # Bootstrap, pipes, filtros, CORS
        ├── modules/
        │   ├── contact/          # Módulo de contacto (Controller, Service, DTO)
        │   │   └── dto/
        │   │       └── create-contact.dto.ts
        │   └── health/           # Endpoint de liveness probe
        └── common/
            ├── filters/
            │   └── http-exception.filter.ts   # Normalización global de errores
            └── utils/
                └── sanitize.util.ts           # Helper XSS con sanitize-html
```

---

## 🏗️ Arquitectura de Errores

El proyecto implementa un pipeline de errores tipado de extremo a extremo:

```
Backend (NestJS)
  └── Emite claves semánticas: MessageKey ("VALIDATION_EMAIL_INVALID", "CONTACT_SUCCESS"...)
        │
        ▼
Frontend (Axios Interceptor)
  └── httpClient.ts captura la respuesta de error
        │
        ▼
  errorMapper.ts → mapErrorMessages(error) → MessageKey[]
        │
        ▼
  i18n/messages.ts → t(key) → Texto visible en UI
```

**Reglas arquitecturales:**
- El backend **nunca** emite strings de UI directamente
- Los componentes React **nunca** interpretan errores crudos
- Todo error pasa por el mapper antes de renderizarse

---

## 🌐 Páginas del Frontend

| Ruta | Componente | Funcionalidad |
|------|-----------|---------------|
| `/` | `Home.tsx` | Hero section con animaciones, CTA, estadísticas visuales |
| `/projects` | `Projects.tsx` | Repositorios de GitHub con filtros por tecnología y animaciones |
| `/about` | `About.tsx` | Perfil profesional, avatar, skills por categoría, redes sociales |
| `/contact` | `Contact.tsx` | Formulario validado con envío real y feedback tipado |

---

## 📡 Endpoints del Backend

### `POST /api/contact`

Envía un email de contacto vía SMTP (Gmail).

**Request body:**
```json
{
  "name": "string (mín. 2 caracteres)",
  "email": "email válido",
  "subject": "string (mín. 3 caracteres)",
  "message": "string (mín. 10 caracteres)"
}
```

**Respuesta exitosa `201`:**
```json
{
  "message": "CONTACT_SUCCESS"
}
```

**Respuesta de error `400`:**
```json
{
  "statusCode": 400,
  "message": ["VALIDATION_EMAIL_INVALID"],
  "error": "BadRequest",
  "path": "/api/contact",
  "timestamp": "2026-04-09T12:00:00.000Z"
}
```

### `GET /api/health`

Liveness probe para verificar estado del servidor.

**Respuesta `200`:**
```json
{
  "status": "ok",
  "timestamp": "2026-04-09T12:00:00.000Z"
}
```

---

## 🔒 Seguridad Implementada

| Medida | Implementación | Descripción |
|--------|---------------|-------------|
| **XSS Prevention** | `sanitize-html` + `@Transform` en DTO | Sanitiza inputs antes de procesarlos |
| **Rate Limiting** | `@nestjs/throttler` | 20 requests / 60 segundos por IP |
| **Validación tipada** | `class-validator` con `MessageKey` | Errores semánticos, nunca strings arbitrarios |
| **Normalización de errores** | `HttpExceptionFilter` global | Formato de error consistente en toda la API |
| **strict mode** | TypeScript strict en frontend y backend | Tipado riguroso sin `any` implícito |

---

## ⚙️ Instalación y Uso

### Prerrequisitos

- **Node.js** >= 20.20.1
- **NPM** >= 10.8.2
- Cuenta de Gmail con [App Password](https://myaccount.google.com/apppasswords) habilitada

### 1. Clonar el repositorio

```bash
git clone https://github.com/jackhorrordevscl/portafolio-fullstack.git
cd portafolio-fullstack
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev       # http://localhost:5173
```

### 3. Backend

```bash
cd backend
npm install
```

Crear el archivo `.env` en `backend/`:

```env
# Configuración SMTP (Gmail)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=tu-email@gmail.com
MAIL_PASS=xxxx_xxxx_xxxx_xxxx     # App Password sin espacios
MAIL_FROM="Portafolio <tu-email@gmail.com>"
MAIL_TO=tu-email-destino@gmail.com
```

```bash
npm run start:dev     # http://localhost:3000
```

---

## 📋 Scripts Disponibles

### Frontend (`/frontend`)

```bash
npm run dev       # Servidor de desarrollo con hot reload (puerto 5173)
npm run build     # Compilación TypeScript + bundle de producción
npm run preview   # Preview del build de producción en local
npm run lint      # Análisis ESLint sin corrección automática
```

### Backend (`/backend`)

```bash
npm run start:dev    # Modo watch (recarga en cambios)
npm run start:prod   # Servidor de producción (node dist/main)
npm run build        # Compilación NestJS
npm run test         # Tests unitarios con Jest
npm run test:watch   # Tests en modo watch
npm run test:e2e     # Tests end-to-end
```

---

## 📊 Estado del Proyecto

| Módulo | Progreso | Estado |
|--------|----------|--------|
| Frontend (UI + páginas) | 95% | ✅ Estable |
| Backend — Módulo de contacto | ✅ | Completo |
| Backend — Módulo de salud | ✅ | Completo |
| Backend — Módulo de proyectos | 0% | Pendiente |
| Dockerización | 0% | Pendiente |
| Deploy (Vercel + Cloud Run) | 0% | Pendiente |
| Email templates HTML | 0% | Pendiente |

---

## 🗺️ Roadmap

- [ ] **Módulo de proyectos** — Proxy hacia GitHub API desde el backend
- [ ] **Dockerización** — `Dockerfile` para frontend y backend + `docker-compose.yml`
- [ ] **Deploy** — Vercel (frontend) + Google Cloud Run (backend)
- [ ] **Plantillas HTML** — Emails de contacto con diseño visual del portafolio
- [ ] **Migración SMTP** — Mover de Gmail a SendGrid o Amazon SES para producción
- [ ] **CI/CD** — GitHub Actions para build y deploy automático

---

## 🤝 Contacto

**Juan José Martínez** — Analista Programador / Fullstack Developer

- GitHub: [@jackhorrordevscl](https://github.com/jackhorrordevscl)
- LinkedIn: [groundzerodevs](https://www.linkedin.com/in/groundzerodevs)
- Instagram: [@jackhorror_](https://www.instagram.com/jackhorror_/)
- Ubicación: Santiago, Chile

---

## 📄 Licencia

Distribuido bajo la licencia **MIT**. Ver [LICENSE](LICENSE) para más información.

© 2026 Juan José Martínez — Ground Zero Development
