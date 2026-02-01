# UN-SportHub - Plan de Proyecto (Mobile First)

**UN-SportHub** es una plataforma integral de gestión e interacción para el entrenamiento deportivo. Esta nueva versión del plan prioriza una aplicación móvil nativa (Android/iOS) para facilitar el acceso a atletas y entrenadores en el campo.

## Tech Stack Actualizado

*   **Backend:** Java (JDK 17), Spring Boot 3. 
*   **Base de Datos:** PostgreSQL. 
*   **Frontend / Mobile:** React Native (con **Expo**).
    *   *Expo* facilita la compilación para Android e iOS.
    *   *NativeWind* (TailwindCSS para RN) para el estilizado.
*   **Seguridad:** Spring Security + JWT.

---

## Roadmap del Proyecto

### Fase 1: Consolidación del Backend
*Objetivo: Asegurar que la API sirva correctamente a una app móvil.*
1.  **API Restful:** Verificar que todos los endpoints retornen JSON limpio.
2.  **Autenticación:** Endpoints de Login y Registro probados con Postman.
3.  **Cors:** Configurar CORS para permitir peticiones desde el dispositivo/emulador.

### Fase 2: Inicialización de la App Móvil
*Objetivo: "Hola Mundo" en el celular.*
1.  **Setup Expo:** Crear proyecto con `npx create-expo-app`.
2.  **Navegación:** Configurar `expo-router` o `react-navigation` (Stack y Tabs).
3.  **Estilos:** Configurar NativeWind (TailwindCSS).

### Fase 3: Autenticación y Perfil
1.  **Pantallas de Auth:** Login y Registro visualmente atractivos.
2.  **Integración:** Conectar con el Backend (Axios/Fetch).
3.  **Almacenamiento Seguro:** Guardar JWT en `Expo SecureStore`.

### Fase 4: Funcionalidades Core (Atleta)
1.  **Home / Dashboard:** Resumen del día.
2.  **Visualizar Entreno:** Ver el plan asignado para hoy.
3.  **Feedback:** Formulario para registrar RPE (esfuerzo percibido) y comentarios tras el entreno.

### Fase 5: Funcionalidades Core (Entrenador)
1.  **Gestión de Atletas:** Lista de atletas a cargo.
2.  **Asignación Móvil:** Una interfaz simplificada para ajustar entrenos "on the go".
    *   *Nota: La edición masiva compleja ("Excel") podría mantenerse en una web admin o adaptarse cuidadosamente a tablets.*

### Fase 6: Comunidad y Social
1.  **Foro/Feed:** Scroll infinito de noticias o posts del equipo.
2.  **Notificaciones:** Alertas locales para recordar entrenos.

### Fase 7: Build y Distribución
1.  **Android:** Generar el `.apk` o `.aab` usando EAS Build o localmente.
2.  **iOS:** Generar build (requiere cuenta developer para TestFlight o build local en Mac).

---

## Estructura de Roles

Se mantiene la lógica de negocio para la agrupación de atletas:

| Categoría (Padre) | Especialidad (Sub-variante) |
| :--- | :--- |
| **Fondo** | 10K, 5K |
| **Semifondo** | 1500m, 800m |
| **Velocidad** | 400m, 200m, 100m |