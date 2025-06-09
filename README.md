# 🎬 Challenge Movie - Aplicación de Películas con TMDB API

Una aplicación web moderna de películas estilo Netflix construida con React, TypeScript, React Query y Tailwind CSS.

## ✨ Características Principales

### 🎭 Interfaz Netflix-Style

- **Header con navegación**: Menú de navegación con estados activos
- **Hero Banner**: Película destacada con información detallada
- **Sidebar dinámico**: Con botón toggle para ocultar/mostrar
- **Continue Watching**: Películas en progreso con controles siempre visibles
- **Popular Movies**: Grid de películas populares con hover interactivo

### 🔧 Funcionalidades Avanzadas

- **Controles siempre visibles**: En sección "Continue Watching"
- **Hover descriptions**: Descripción de películas al hacer hover
- **Responsive design**: Adaptable a todos los tamaños de pantalla
- **Error handling**: Componente ErrorBoundary y manejo de errores de API
- **Fallback images**: Imágenes por defecto para posters rotos

### 🚀 Tecnologías Utilizadas

- **React 18** + **TypeScript** - Base de la aplicación
- **React Query** - Manejo de estado y cache de datos
- **Tailwind CSS** - Estilos utilitarios
- **TMDB API** - Datos de películas
- **Vite** - Build tool y desarrollo rápido

### 📦 Arquitectura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Header/         # Navegación principal
│   ├── HeroBanner/     # Banner principal
│   ├── Sidebar/        # Sidebar con géneros
│   ├── ContinueWatching/ # Películas en progreso
│   ├── PopularMovies/  # Grid de películas populares
│   ├── ErrorBoundary/  # Manejo de errores React
│   └── Image/          # Componente de imagen con fallback
├── hooks/              # Custom hooks
├── services/           # APIs y servicios
├── mockData/           # Datos mock para desarrollo
├── constants/          # Constantes y configuración
└── styles/             # Estilos globales
```

## 🎯 Nuevas Funcionalidades Implementadas

### 1. Sidebar Toggle

- ✅ Botón para ocultar/mostrar sidebar
- ✅ Transición suave con animación
- ✅ Icono que rota según el estado

### 2. Continue Watching Mejorado

- ✅ Controles siempre visibles (play, pause, progreso)
- ✅ Descripción de película en hover con delay
- ✅ Carga lazy de detalles de película
- ✅ Indicador de loading para descripción

### 3. Popular Movies Optimizado

- ✅ Tamaño de tarjetas reducido para coincidir con el diseño
- ✅ Botones de play más pequeños
- ✅ Mejor distribución responsive

## 🛠️ Instalación y Uso

### Prerrequisitos

- Node.js (v16 o superior)
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone <tu-repositorio>

# Navegar al directorio
cd challenge-movies

# Instalar dependencias
npm install

# Crear archivo de variables de entorno
cp .env.example .env
```

### Configuración

1. Obtén tu API key de [TMDB](https://www.themoviedb.org/settings/api)
2. Agrega tu API key en el archivo `.env`:

```
VITE_TMDB_API_KEY=tu_api_key_aqui
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## 🔧 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run preview` - Previsualizar build
- `npm run lint` - Ejecutar ESLint
- `npm run type-check` - Verificar tipos TypeScript

## 🎨 Características de UI/UX

### Sidebar Dinámico

- Botón toggle para ocultar/mostrar
- Transición suave de 300ms
- Estado persistente durante la sesión

### Continue Watching

- Controles siempre visibles con overlay
- Hover description con delay de 500ms
- Progress bar animada
- Avatares de usuarios simulados

### Popular Movies

- Grid responsivo con tamaños optimizados
- Hover effects con scale y transform
- Lazy loading de imágenes
- Fallback para imágenes rotas

## 🚀 Próximas Mejoras

- [ ] Autenticación de usuarios
- [ ] Listas de favoritos
- [ ] Reproductor de video integrado
- [ ] Búsqueda avanzada
- [ ] Recomendaciones personalizadas
- [ ] Tema oscuro/claro

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🎬 Demo

La aplicación incluye:

- Datos reales de películas de TMDB
- Interfaz completamente responsive
- Animaciones y transiciones suaves
- Manejo de errores robusto
- Optimización de performance con React Query

---

Desarrollado con ❤️ usando React, TypeScript y TMDB API
