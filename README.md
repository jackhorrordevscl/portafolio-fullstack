<div align="center">

# ⚡ Ground Zero Devs

### Portafolio Fullstack — Producción

[![License: MIT](https://img.shields.io/badge/License-MIT-C8F542?style=for-the-badge)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[![Vercel](https://img.shields.io/badge/Vercel-Frontend-black?style=flat-square&logo=vercel)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Render-Backend-purple?style=flat-square&logo=render)](https://render.com/)
[![Resend](https://img.shields.io/badge/Resend-Email-orange?style=flat-square)](https://resend.com/)
[![Status](https://img.shields.io/badge/Status-Production-success?style=flat-square)]()

</div>

---

## 🌐 Demo en producción

🔗 Frontend: https://portafolio-fullstack-sage.vercel.app
🔗 Backend: https://portafolio-fullstack-edqs.onrender.com/api

> El sitio aún corre sobre los subdominios de Vercel/Render. El dominio propio (`groundzerodevs.com`) ya está verificado y en uso solo como remitente del correo corporativo, no como dominio del sitio.

---

## 📖 Descripción

Portafolio profesional de **Juan José Martínez / Ground Zero Devs**, desarrollado y desplegado en producción real (no es una demo local). Presenta el perfil profesional, proyectos y un formulario de contacto funcional end-to-end.

El proyecto tiene dos identidades de marca separadas en el mismo frontend: `brandProfile` (Ground Zero Devs, usado en Home, Header, Footer y Contact) y `userProfile` (Juan José Martínez, usado en About).

---

## 🧠 Arquitectura

```
Frontend (React + Vite)  →  Backend API (NestJS)  →  Resend (Email API)
```

Monorepo con dos paquetes independientes (`frontend/`, `backend/`), cada uno con su propio `package.json` y despliegue.

---

## 🛠️ Stack técnico

### Frontend (`frontend/`)

| Tecnología | Rol |
|---|---|
| React 19 + TypeScript | UI |
| Vite | Build tool / dev server |
| React Router 7 | SPA routing |
| MUI 7 + Emotion | Componentes UI |
| Framer Motion | Animaciones |
| Axios | HTTP client |
| Sass | Estilos |
| react-helmet-async | SEO / meta tags por página |
| i18n propio (`src/i18n/messages.ts`) | Textos y mensajes de error traducidos |
| Vitest | Tests |

### Backend (`backend/`)

| Tecnología | Rol |
|---|---|
| NestJS 11 + TypeScript | Framework API |
| class-validator / class-transformer | Validación y transformación de DTOs |
| sanitize-html | Sanitización de inputs del formulario de contacto |
| Resend | Envío de emails (reemplazó a SMTP/Nodemailer) |
| nest-winston / Winston | Logging estructurado |
| @nestjs/throttler | Rate limiting |
| Jest | Tests unitarios y e2e |

---

## 📬 Sistema de contacto

Flujo real en producción:

```
Frontend → POST /api/contact → ContactService → Resend → Email a MAIL_TO
```

Protecciones implementadas:
- Validación de longitud por campo (`name` 100, `email`/`subject` 150, `message` 2000 caracteres) con mensajes de error traducidos.
- Sanitización de HTML en los inputs (`sanitize-html`) antes de procesarlos.
- Honeypot (campo `website` oculto): si llega completado, se responde éxito simulado sin enviar el email ni revelar la detección.
- Rate limiting global (20 req/60s) vía `ThrottlerModule`.
- Remitente verificado con dominio propio: `Ground Zero Devs <contacto@groundzerodevs.com>`.

---

## 🔒 Seguridad

| Medida | Implementación |
|---|---|
| Sanitización de inputs | `sanitize-html` en el DTO de contacto |
| Validación de payloads | `class-validator` + `ValidationPipe` global (whitelist, forbidNonWhitelisted) |
| Rate limiting | `@nestjs/throttler`, guard custom (`CustomThrottlerGuard`) |
| CORS | Whitelist explícita de orígenes en `main.ts` |
| Manejo de errores | Filtro global de excepciones HTTP |
| Anti-spam | Honeypot en formulario de contacto |

> Pendiente conocido: no hay `helmet` configurado en el backend (ver issue #18 del board).

---

## ⚙️ Variables de entorno

### Backend

```
RESEND_API_KEY=
MAIL_TO=
MAIL_FROM=       # opcional, default: "Ground Zero Devs <contacto@groundzerodevs.com>"
PORT=
```

### Frontend

```
VITE_API_URL=https://portafolio-fullstack-edqs.onrender.com/api
```

---

## 🐳 Docker

El backend incluye un `Dockerfile` multi-stage (build + producción, usuario no-root) usado para el deploy en Render.

---

## 📊 Estado del proyecto

| Área | Estado |
|---|---|
| Frontend | ✅ En producción (Vercel) |
| Backend | ✅ En producción (Render) |
| Email de contacto | ✅ Operativo con dominio propio verificado |
| Dominio propio del sitio | ⏳ Pendiente (solo el email usa `groundzerodevs.com`) |

El trabajo pendiente se gestiona como issues en el repo de GitHub, no en este README.

---

## 🤝 Contacto

Juan José Martínez — Ground Zero Devs
Fullstack Developer

- GitHub: https://github.com/jackhorrordevscl
- LinkedIn: https://linkedin.com/in/groundzerodevs

---

## 📄 Licencia

MIT License
