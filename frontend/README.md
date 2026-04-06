cat > README.md << 'EOF'
# 🚀 Ground Zero - Portfolio Fullstack

<div align="center">
  
  ![Ground Zero Logo](https://via.placeholder.com/800x200/0C0F14/C8F542?text=GROUND+ZERO+DEVELOPMENT)
  
  **Portafolio profesional de Juan José Martínez**  
  *Analista Programador | Fullstack Developer*
  
  [![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![NestJS](https://img.shields.io/badge/NestJS-10.0-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
  
  [Demo en vivo](https://tudominio.com) · [Reportar Bug](https://github.com/jackhorrordevscl/portafolio-fullstack/issues) · [Solicitar Feature](https://github.com/jackhorrordevscl/portafolio-fullstack/issues)

</div>

---

## 📋 Tabla de Contenidos

- [Sobre el Proyecto](#-sobre-el-proyecto)
- [Características](#-características)
- [Stack Tecnológico](#-stack-tecnológico)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Deployment](#-deployment)
- [Paleta de Colores](#-paleta-de-colores)
- [Roadmap](#-roadmap)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)
- [Contacto](#-contacto)

---

## 🎯 Sobre el Proyecto

**Ground Zero** es un portafolio profesional fullstack diseñado para destacar proyectos, habilidades técnicas y experiencia profesional de manera moderna y atractiva. 

El proyecto integra la API de GitHub para mostrar repositorios en tiempo real y cuenta con un sistema de contacto funcional.

### ✨ Características Principales

- 🎨 **Diseño Moderno**: Interfaz oscura con acentos neón (Lima y Cyan)
- 📱 **Responsive**: Diseño adaptativo desde móvil hasta desktop
- ⚡ **Performance**: Optimizado con Vite y code splitting
- 🔄 **GitHub Integration**: Muestra proyectos directamente desde GitHub API
- 📧 **Formulario de Contacto**: Sistema de mensajería con validación
- 🎭 **Animaciones Fluidas**: Transiciones suaves con Framer Motion
- 🌐 **SEO Optimizado**: Meta tags completos para mejor indexación
- 🐳 **Dockerizado**: Listo para deploy en cualquier plataforma

---

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: React 18.3.1
- **Build Tool**: Vite (reemplazo de CRA)
- **Lenguaje**: TypeScript 5.x
- **Estilos**: SCSS + Material-UI v5
- **Routing**: React Router DOM v6
- **Animaciones**: Framer Motion
- **HTTP Client**: Axios

### Backend
- **Framework**: NestJS 10.3+
- **Arquitectura**: Microservicios híbridos
- **Lenguaje**: TypeScript
- **Email**: Nodemailer
- **Validación**: class-validator
- **Documentación**: Swagger/OpenAPI

### DevOps
- **Containerización**: Docker + Docker Compose
- **Frontend Deploy**: Vercel
- **Backend Deploy**: Google Cloud Run
- **CI/CD**: GitHub Actions (planificado)

---

## 📁 Estructura del Proyecto

portafolio-fullstack/
├── frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── NotFound.tsx
│   │   ├── services/
│   │   │   ├── githubService.ts
│   │   │   └── contactService.ts
│   │   ├── styles/
│   │   │   ├── _variables.scss
│   │   │   ├── global.scss
│   │   │   ├── components/
│   │   │   └── pages/
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   └── config.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── backend/ (en desarrollo)
│   └── ...
├── docker-compose.yml (pendiente)
└── README.md

---

## 🚀 Instalación

### Requisitos Previos

- Node.js >= 20.20.1
- npm >= 10.8.2
- Git

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
   git clone https://github.com/jackhorrordevscl/portafolio-fullstack.git
   cd portafolio-fullstack
```

2. **Instalar dependencias del frontend**
```bash
   cd frontend
   npm install
```

3. **Configurar variables de entorno**
   
   Edita `src/utils/config.ts` con tu información personal:
```typescript
   export const userProfile = {
     name: 'Tu Nombre',
     email: 'tu@email.com',
     github: 'https://github.com/tu-usuario',
     // ... más configuración
   };
```

4. **Iniciar servidor de desarrollo**
```bash
   npm run dev
```

5. **Abrir en el navegador**
   
   Navega a `http://localhost:5173`

---

## 💻 Uso

### Desarrollo
```bash
# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview de build de producción
npm run preview

# Linting
npm run lint
```

### Personalización

#### Actualizar información personal
Edita `src/utils/config.ts`:
- `userProfile`: Datos personales
- `skillGroups`: Habilidades técnicas
- `TEXTS`: Textos de la interfaz

#### Modificar colores
Edita `src/styles/_variables.scss`:
```scss
$primary-lime: #C8F542;
$primary-cyan: #42F5D4;
$bg-dark-primary: #0C0F14;
```

#### Agregar proyectos destacados
En `src/utils/config.ts`:
```typescript
export const githubConfig = {
  featuredRepos: ['proyecto-1', 'proyecto-2'] as string[],
};
```

---

## 🌐 Deployment

### Frontend (Vercel)

1. **Conectar repositorio a Vercel**
```bash
   # Instalar Vercel CLI
   npm i -g vercel
   
   # Deploy
   cd frontend
   vercel
```

2. **Configurar variables de entorno en Vercel**
   - Ir a Project Settings > Environment Variables
   - Agregar `VITE_API_URL` con la URL del backend

### Backend (Google Cloud Run)
```bash
# Pendiente - instrucciones cuando el backend esté listo
```

### Docker (Desarrollo Local)
```bash
# Pendiente - docker-compose.yml
```

---

## 🎨 Paleta de Colores

<table>
  <tr>
    <th>Uso</th>
    <th>Color</th>
    <th>Hex</th>
    <th>Preview</th>
  </tr>
  <tr>
    <td>Acento Principal</td>
    <td>Lima</td>
    <td>#C8F542</td>
    <td><img src="https://via.placeholder.com/50x30/C8F542/C8F542" /></td>
  </tr>
  <tr>
    <td>Acento Secundario</td>
    <td>Cyan</td>
    <td>#42F5D4</td>
    <td><img src="https://via.placeholder.com/50x30/42F5D4/42F5D4" /></td>
  </tr>
  <tr>
    <td>Fondo Principal</td>
    <td>Oscuro</td>
    <td>#0C0F14</td>
    <td><img src="https://via.placeholder.com/50x30/0C0F14/0C0F14" /></td>
  </tr>
  <tr>
    <td>Superficie</td>
    <td>Gris Oscuro</td>
    <td>#141C28</td>
    <td><img src="https://via.placeholder.com/50x30/141C28/141C28" /></td>
  </tr>
  <tr>
    <td>Texto Principal</td>
    <td>Blanco Cálido</td>
    <td>#E8EDF5</td>
    <td><img src="https://via.placeholder.com/50x30/E8EDF5/E8EDF5" /></td>
  </tr>
</table>

### Gradiente Característico
```css
background: linear-gradient(90deg, #C8F542 0%, #42F5D4 100%);
```

---

## 🗺️ Roadmap

### ✅ Completado
- [x] Estructura base del proyecto
- [x] Diseño responsive completo
- [x] Integración GitHub API
- [x] Sistema de navegación
- [x] Formulario de contacto (modo mock)
- [x] Animaciones con Framer Motion
- [x] SEO y meta tags
- [x] Favicon y manifest.json

### 🚧 En Progreso
- [ ] Backend con NestJS
- [ ] Dockerización completa
- [ ] Deploy a producción

### 📅 Planificado
- [ ] Sistema de blog con MDX
- [ ] Dark/Light mode toggle
- [ ] Tests unitarios y E2E
- [ ] CI/CD con GitHub Actions
- [ ] Analytics de visitas
- [ ] Internacionalización (ES/EN)
- [ ] PWA completo
- [ ] Certificaciones y logros

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más información.

---

## 📧 Contacto

**Juan José Martínez**

- Email: [jmartinezc.cp@gmail.com](mailto:jmartinezc.cp@gmail.com)
- LinkedIn: [linkedin.com/in/groundzerodevs](https://www.linkedin.com/in/groundzerodevs)
- GitHub: [@jackhorrordevscl](https://github.com/jackhorrordevscl)
- Portfolio: [tudominio.com](https://tudominio.com)

---

## 🙏 Agradecimientos

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Material-UI](https://mui.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [NestJS](https://nestjs.com/)

---

<div align="center">
  
  **Hecho con ❤️ y ☕ por Juan José Martínez**
  
  ⭐ Si te gustó este proyecto, considera darle una estrella en GitHub
  
</div>
