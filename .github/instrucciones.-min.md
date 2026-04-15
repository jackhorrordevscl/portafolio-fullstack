# 📘 DOCUMENTO EJECUTIVO: GROUND ZERO DEVELOPMENT PORTFOLIO (v2.0.0)

## 🎯 1. REQUERIMIENTO Y ALCANCE
Objetivo: Desarrollar un portafolio fullstack profesional para Juan José Martínez (Analista Programador), orientado a demostrar competencias en arquitectura cloud-native, TypeScript y optimización de UI.

* GitHub: jackhorrordevscl | LinkedIn: groundzerodevs
* Email: jmartinezc.cp@gmail.com | Ubicación: Santiago, Chile

Funcionalidades Core:
* GitHub Integration: Consumo dinámico de repositorios vía API oficial.
* Contact System: Formulario con validación estricta, rate limiting y SMTP real.
* UX/UI: Identidad visual "Dark Neon", responsive design y animaciones fluidas.
* Infraestructura: Contenerización y despliegue distribuido (Serverless + Edge).

---

## 🏗️ 2. ARQUITECTURA TÉCNICA

### Stack Tecnológico
- Frontend: React 18.3, TypeScript 5, Vite, MUI v5, Framer Motion, Axios (Estado: 95%)
- Backend: NestJS 10 (Arquitectura Modular), Node 20.20, Winston (Estado: 100%)
- Seguridad: @nestjs/throttler, class-validator, sanitize-html (Estado: 100%)
- Infraestructura: Docker (Multi-stage), Ubuntu 24.04 (Estado: 100%)

Estructura de Directorios:
/portafolio-fullstack/
├── frontend/      # SPA (React + Vite) - Config: VITE_API_URL
└── backend/       # API (NestJS) - Docker ID: a9be6b1de6cc

### Sistema de Diseño (Brand Identity)
* Paleta: Fondo #0C0F14, Acentos neón #C8F542 (lima) y #42F5D4 (cyan).
* Gradiente: linear-gradient(90deg, #C8F542 0%, #42F5D4 100%).
* Tipografía: Inter (UI) y Fira Code (Code blocks).

---

## 🔐 3. SEGURIDAD Y CONTRATOS DE COMUNICACIÓN

### Pipeline de Validación y Rate Limiting
* Global Rate Limit: 20 req/60s.
* Contact Endpoint: 5 req/60s (Estrategia: Throttler en memoria).
* Sanitización: Uso de sanitize-html para prevenir ataques XSS.

### Estandarización de Respuestas (API Contract)
Éxito (200/201):
{ "message": "CONTACT_SUCCESS" }

Error (4xx/5xx):
{
  "statusCode": 400,
  "message": ["VALIDATION_NAME_TOO_SHORT", "VALIDATION_EMAIL_INVALID"],
  "error": "Bad Request",
  "path": "/api/contact",
  "timestamp": "2026-04-10T23:30:00.000Z"
}

---

## 🚨 4. GESTIÓN DE INCIDENTES Y BUGS

### Incidentes de Seguridad (Resueltos)
* Exposición de Credenciales: Filtración de App Passwords en logs. 
* Acción: Revocación de tokens, nuevas llaves y auditoría estricta de .gitignore.

### Bugs Críticos Corregidos
1. TS1272: Error en metadatos de decoradores resuelto vía import type.
2. DI Error: Fallo de inyección en CustomThrottlerGuard reordenando providers.
3. Versión Throttler: Alineación de firma del constructor con v6.5.0.

---

## 🚀 5. ESTRATEGIA DE DEPLOYMENT

### Infraestructura Destino
1. Backend (Google Cloud Run): Serverless, escala a 0. Secretos vía Secret Manager.
2. Frontend (Vercel): Despliegue CI/CD, optimización Edge y SSL.

Decisión Técnica: Eliminación de Redis por baja carga proyectada (<5k req/día), priorizando Throttler en memoria para reducir latencia y costos.

---

## 📋 6. ROADMAP DE IMPLEMENTACIÓN

Fase 1: Hardening & Docker (Completado ✅)
- Revocación de credenciales comprometidas.
- Creación de .env.example sanitizado.
- Build de imagen Docker multi-stage.

Fase 2: Validación Local (En Proceso ⏳)
- Test de contenedor con .env.docker.
- Verificación de logs y CustomThrottlerGuard.

Fase 3: Cloud Provisioning (Pendiente ⏸️)
- Setup GCP, Artifact Registry y Cloud Run.
- Inyección de secretos y configuración de CORS.

---

## 📊 7. MÉTRICAS DE PROGRESO
DESARROLLO (FE/BE): [████████████████████] 100%
SEGURIDAD:          [████████████████████] 100%
DOCKERIZACIÓN:      [██████████████████░░]  90%
CLOUD SETUP/DEPLOY: [░░░░░░░░░░░░░░░░░░░░]   0%
----------------------------------------------
PROGRESO GLOBAL: 75%

PRÓXIMOS PASOS:
1. Validar Docker: docker run --env-file .env.docker -p 3001:3000.
2. Handshake GCP: gcloud auth login y push de imagen.

Sincronización: 2026-04-10 23:30 (UTC-3) | Versión: Ground Zero v0.5.5