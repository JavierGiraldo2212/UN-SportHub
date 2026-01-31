# UN-SportHub - Plan de Proyecto

**UN-SportHub** es una plataforma integral de gestión e interacción para el entrenamiento deportivo, enfocada en conectar entrenadores y atletas de diferentes disciplinas de atletismo.

## Tech Stack Propuesto

* **Backend:** Java (JDK 17), Spring Boot 3.
* **Frontend:** React (Vite) + TypeScript.
* **Base de Datos:** PostgreSQL (Recomendado para relaciones complejas) corriendo en Docker local.
* **Seguridad:** Spring Security + JWT.
* **Herramientas:** Docker, Postman, Git.

---

## Roadmap del Proyecto

Seguiremos un enfoque iterativo, priorizando la calidad y la arquitectura limpia.

### Fase 1: Inception y Requerimientos
*Objetivo: Definir claramente QUÉ vamos a construir.*

1.  **Definición de Actores y Roles:**
    * Estandarización de roles (Agrupación: Velocidad, Semifondo, Fondo).
    * Sub-variantes (ej. 100m, 10k).
2.  **Historias de Usuario (User Stories):**
    * Redacción en formato: *"Como [rol], quiero [acción] para [beneficio]"*.
    * Criterios de aceptación para cada historia.
3.  **Diagrama de Casos de Uso:**
    * Visualizar las interacciones principales (Login, Publicar entreno, Comentar foro).

### Fase 2: Diseño y Arquitectura
*Objetivo: Planear CÓMO lo vamos a construir.*

1.  **Modelo Entidad-Relación (DER):**
    * Diseño de base de datos (Usuarios, Entrenamientos, Roles, Foro, Eventos).
2.  **Mockups / Wireframes:**
    * Diseño de baja fidelidad para la "Vista Excel" del entrenador.
    * Diseño del Calendario y Foro.
3.  **Arquitectura del Backend:**
    * Definir estructura de paquetes (Controller, Service, Repository, DTOs).
    * Configuración inicial de Spring Boot.

### Fase 3: Configuración del Entorno Local
*Objetivo: Tener todo listo para codificar.*

1.  **Repositorio:** Estructura de carpetas (monorepo o repos separados).
2.  **Base de Datos:** Script de `docker-compose.yml` para levantar PostgreSQL localmente.
3.  **Hola Mundo:** Conexión básica entre Spring Boot y la Base de datos.

### Fase 4: Desarrollo del Backend (Iterativo)
*Objetivo: Crear la lógica de negocio y APIs.*

1.  **Módulo de Autenticación:** Login, Registro y Roles.
2.  **Módulo de Usuarios:** Gestión de perfiles y categorías de atletas.
3.  **Módulo de Entrenamientos:**
    * CRUD de planes de entrenamiento.
    * Lógica para asignar por "Tipo de Deportista" y Fechas.
4.  **Módulo de Foro:** Posts, comentarios y subida de archivos (almacenamiento local por ahora).
5.  **Módulo de Calendario y Eventos:** Lógica de fechas y visualización.

### Fase 5: Desarrollo del Frontend
*Objetivo: Crear la interfaz visual.*

1.  **Setup Inicial:** React Router, Redux o Context API, Librería de UI (ej. Material UI o Tailwind).
2.  **Vista de Entrenador (El "Excel"):** Implementación de grilla editable para asignar cargas.
3.  **Vista de Calendario:** Integración de librería de calendario para ver eventos y entrenos.
4.  **Foro Social:** Vistas de feed, post individual y comentarios.
5.  **Dashboard de Atleta:** Registro de sensaciones (feedback).

### Fase 6: Pruebas y Refinamiento
*Objetivo: Asegurar la calidad.*

1.  **Unit Testing:** JUnit y Mockito para servicios críticos del backend.
2.  **Pruebas de Integración:** Verificar flujo completo API -> BD.
3.  **Corrección de Bugs:** Ajustes visuales y lógicos.

### Fase 7: Despliegue Local y Documentación
*Objetivo: Entrega final en entorno local.*

1.  **Dockerización completa:** `docker-compose` que levante Backend, Frontend y BD en un solo comando.
2.  **Manual de Usuario:** Guía básica de uso.
3.  **Documentación Técnica:** Javadoc y Swagger para la API.

---

## Estructura de Roles (Propuesta Inicial)

Para organizar mejor a los deportistas, usaremos una estructura de **Categoría Padre** y **Especialidad**.

| Categoría (Padre) | Especialidad (Sub-variante) |
| :--- | :--- |
| **Fondo** | 10K, 5K |
| **Semifondo** | 1500m, 800m |
| **Velocidad** | 400m, 200m, 100m |

*Nota: Esto permite al entrenador asignar un entrenamiento general a todos los de "Fondo" o específico solo a los de "10K".*