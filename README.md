# 🎮 Pokémon Team Builder & Battle Arena

Una aplicación web interactiva para crear equipos Pokémon, gestionar borradores y simular batallas entre equipos. Construida con React, Vite y tecnologías modernas de desarrollo web.

## 🏗️ Arquitectura y Patrones de Diseño

### **Arquitectura General**
- **Arquitectura de Componentes**: Basada en React con componentes funcionales
- **Client-Side Rendering (CSR)**: Aplicación SPA (Single Page Application)  
- **Arquitectura en Capas**: Separación clara entre presentación, lógica de negocio y servicios

### **Patrones de Diseño Implementados**

#### 1. **Component Composition Pattern**
- Composición de componentes reutilizables
- Separación de responsabilidades por feature (`teams/`, `combat/`, `commons/`)
- Layout components para estructura base

#### 2. **Custom Hooks Pattern**
- `usePokemon.js` - Lógica de datos de Pokémon
- `usePokemonPagination.js` - Manejo de paginación
- `useTeamEditor.js` - Lógica de edición de equipos
- `useAutoSave.js` - Funcionalidad de guardado automático

#### 3. **Service Layer Pattern**
- `pokemonService.js` - Abstracción de la API externa (PokéAPI)
- Centralización de llamadas HTTP y transformación de datos

#### 4. **State Management Pattern (Zustand)**
- Store centralizado con `teamsStore.js`
- Persistencia automática con middleware de Zustand
- Acciones y estados immutables

#### 5. **Provider Pattern**
- React Query para cache y sincronización de datos
- Context implícito para estado global

#### 6. **Repository Pattern**
- Abstracción de fuentes de datos externas
- Transformación y normalización de datos de la PokéAPI

#### 7. **Observer Pattern**
- React Query para invalidación reactiva de cache
- Notificaciones con Sonner toast system

### **Estructura de Arquitectura**

```
src/
├── components/          # Componentes UI organizados por feature
│   ├── combat/         # Componentes de batalla
│   ├── commons/        # Componentes reutilizables
│   ├── Home/           # Componentes de página principal
│   ├── teams/          # Componentes de gestión de equipos
│   └── ui/             # Componentes de interfaz base
├── hooks/              # Custom hooks (lógica reutilizable)
├── layouts/            # Layouts de página
├── pages/              # Páginas principales
├── router/             # Configuración de rutas
├── services/           # Capa de servicios (API calls)
├── store/              # Estado global (Zustand)
└── utils/              # Utilidades y helpers
```

## 🛠️ Stack Tecnológico

### **Frontend Core**
- **React 19.1.0** - Framework principal
- **Vite 6.3.5** - Build tool y dev server
- **React Router DOM 7.6.2** - Enrutamiento client-side
- **TailwindCSS 4.1.10** - Framework CSS utility-first

### **Estado y Datos**
- **Zustand 5.0.5** - Manejo de estado global
- **TanStack Query 5.80.7** - Cache y sincronización de datos
- **Persist middleware** - Persistencia de estado

### **UI/UX**
- **Lucide React 0.517.0** - Iconografía
- **Sonner 2.0.5** - Sistema de notificaciones toast
- **@dnd-kit** - Drag and drop functionality
  - `@dnd-kit/core 6.3.1`
  - `@dnd-kit/sortable 10.0.0`
  - `@dnd-kit/utilities 3.2.2`

### **Desarrollo**
- **ESLint 9.25.0** - Linting y calidad de código
- **TypeScript types** - Tipado para React (dev)

### **API Externa**
- **PokéAPI** - Datos de Pokémon (https://pokeapi.co/)

## 🚀 Instalación y Configuración

### **Prerrequisitos**
- Node.js (versión 18 o superior)
- npm o yarn como gestor de paquetes

### **Instalación**

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd pokemon
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

4. **Compilar para producción**
```bash
npm run build
```

5. **Preview de producción**
```bash
npm run preview
```

6. **Linting**
```bash
npm run lint
```

### **Scripts Disponibles**
- `npm run dev` - Servidor de desarrollo con hot reload
- `npm run build` - Build optimizado para producción
- `npm run preview` - Preview local del build de producción
- `npm run lint` - Análisis de código con ESLint

## 🎯 Funcionalidades Principales

- **🏠 Exploración de Pokémon**: Lista paginada con datos de PokéAPI
- **👥 Gestión de Equipos**: Crear, editar y eliminar equipos de hasta 6 Pokémon
- **📝 Sistema de Borradores**: Guardar equipos en progreso
- **⚔️ Sistema de Batallas**: Simulador de combates entre equipos
- **📊 Estadísticas**: Tracking de victorias y derrotas
- **💾 Persistencia**: Guardado automático local
- **🎨 UI Moderna**: Interfaz responsive con TailwindCSS
- **🚀 Performance**: Cache inteligente y optimizaciones

## 🌐 API Integration

El proyecto consume la **PokéAPI** (https://pokeapi.co/) para obtener:
- Lista de Pokémon con paginación
- Detalles completos de cada Pokémon
- Estadísticas de combate (ataque, defensa, velocidad)
- Sprites e imágenes oficiales
- Tipos y características

## 📱 Responsive Design

La aplicación está optimizada para:
- **Desktop** - Experiencia completa
- **Tablet** - Layouts adaptados
- **Mobile** - Interfaz touch-friendly

## 🔧 Configuración de Desarrollo

### **Vite Configuration**
```javascript
// vite.config.js
plugins: [
  react(),
  tailwindcss()
]
```

### **ESLint Rules**
- React Hooks rules
- React Refresh compatibility
- Modern JavaScript standards
