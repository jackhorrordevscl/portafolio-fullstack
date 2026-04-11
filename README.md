<div align="center">

# ⚡ Ground Zero Development

### Portafolio Fullstack Profesional (Production Ready)

[![License: MIT](https://img.shields.io/badge/License-MIT-C8F542?style=for-the-badge)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![NestJS](https://img.shields.io/badge/NestJS-10-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[![Vercel](https://img.shields.io/badge/Vercel-Frontend-black?style=flat-square&logo=vercel)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Render-Backend-purple?style=flat-square&logo=render)](https://render.com/)
[![Resend](https://img.shields.io/badge/Resend-Email-orange?style=flat-square)](https://resend.com/)
[![Status](https://img.shields.io/badge/Status-Production-success?style=flat-square)]()

</div>

---

## 🌐 Demo en Producción

🔗 Frontend: https://portafolio-fullstack-sage.vercel.app  
🔗 Backend: https://portafolio-fullstack-edqs.onrender.com/api  

---

## 🖼️ Preview

> Agregar capturas en `/docs/images`

---

## 📖 Descripción

**Ground Zero Development** es un portafolio fullstack profesional desarrollado y desplegado en producción real.

El proyecto demuestra capacidades en:

- Arquitectura distribuida
- Desarrollo frontend/backend moderno
- Resolución de problemas reales en cloud

---

## 🧠 Arquitectura

Frontend (React + Vite)
↓
Backend API (NestJS)
↓
Resend API (Email)

---

## 🚨 CAMBIO ARQUITECTÓNICO CLAVE

### ❌ Eliminado
- SMTP (Gmail + Nodemailer)

### ✅ Implementado
- Resend (Email API)

**Motivo:**
- Fallo ENETUNREACH (IPv6)
- Bloqueo SMTP en cloud
- Timeouts en requests

---

## 🛠️ Stack Técnico

### Frontend

| Tecnología | Rol |
|------------|-----|
| React 18 | UI |
| TypeScript | Tipado |
| Vite | Build tool |
| React Router | SPA Routing |
| MUI | UI Components |
| Framer Motion | Animaciones |
| Axios | HTTP Client |

### Backend

| Tecnología | Rol |
|------------|-----|
| NestJS 10 | Framework |
| class-validator | Validación |
| sanitize-html | XSS protection |
| Winston | Logging |
| Throttler | Rate limiting |

---

## 📬 Sistema de Contacto

Flujo real en producción:

Frontend → Backend → Resend → Email


✔️ No bloqueante  
✔️ Cloud-compatible  
✔️ Sin SMTP  

---

## 🚨 Problemas Reales Resueltos

- CORS en producción
- SMTP bloqueado (IPv6)
- Timeout por operaciones síncronas
- Error 502 (puerto incorrecto)
- Routing SPA en Vercel (404 en refresh)
- Configuración de variables en build

---

## 🔒 Seguridad

| Medida | Implementación |
|--------|---------------|
| XSS | sanitize-html |
| Validación | class-validator |
| Rate limiting | 20 global / 5 contacto |
| Errores | Filtro global |

---

## 🐳 Docker

- Backend dockerizado (multi-stage)
- Deploy automático en Render

---

## ⚙️ Variables de Entorno

### Backend

RESEND_API_KEY=
MAIL_TO=
PORT=

### Frontend

VITE_API_URL=https://portafolio-fullstack-edqs.onrender.com/api

---

## 📊 Estado del Proyecto

| Área | Estado |
|------|--------|
| Frontend | ✅ Producción |
| Backend | ✅ Producción |
| Email | ✅ Operativo |
| Deploy | ✅ Completo |

---

## 🗺️ Roadmap

- [ ] Dominio propio
- [ ] Email con dominio
- [ ] Analytics
- [ ] Observabilidad

---

## 🤝 Contacto

Juan José Martínez  
Fullstack Developer  

- GitHub: https://github.com/jackhorrordevscl  
- LinkedIn: https://linkedin.com/in/groundzerodevs  

---

## 📄 Licencia

MIT License