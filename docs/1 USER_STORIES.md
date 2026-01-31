# Historias de Usuario - UN-SportHub

Este documento detalla los requerimientos funcionales del sistema desde la perspectiva del usuario final.

## Leyenda de Prioridad
* **Alta:** Funcionalidad crítica para el MVP (Producto Mínimo Viable).
* **Media:** Funcionalidad importante, pero el sistema puede operar sin ella inicialmente.
* **Baja:** Mejoras futuras.

---

## Modulo 1: Registro y Gestión de Usuarios

### HU-01: Registro de Usuarios
**Como** visitante de la aplicación,
**Quiero** crear una cuenta seleccionando si soy "Entrenador" o "Deportista",
**Para** poder acceder a las funcionalidades correspondientes a mi perfil.

* **Criterios de Aceptación:**
    * El formulario de registro debe solicitar: Nombre, Apellido, Correo electrónico, Contraseña y Rol (Entrenador o Deportista).
    * Al registrarse como Deportista, el usuario queda en estado "Sin Clasificar" hasta que un entrenador le asigne una categoría.
    * Validación de correo electrónico único.

### HU-02: Asignación de Categoría Deportiva
**Como** Entrenador,
**Quiero** buscar a un deportista registrado y asignarle su categoría (Fondo, Semifondo, Velocidad) y su especialidad (ej. 10K, 100m),
**Para** integrarlo en los grupos de planificación de entrenamiento adecuados.

* **Criterios de Aceptación:**
    * El entrenador debe tener una lista de deportistas registrados.
    * Debe poder editar el perfil deportivo del atleta para seleccionar la "Categoría Padre" y la "Sub-variante".
    * Un deportista solo puede tener una configuración de categoría activa a la vez.

---

## Modulo 2: Planificación de Entrenamientos

### HU-03: Gestión Mensual de Cargas (Vista Entrenador)
**Como** Entrenador,
**Quiero** visualizar y editar una grilla tipo hoja de cálculo seleccionando un mes y un tipo de deportista,
**Para** planificar las sesiones de entrenamiento de todo el mes de manera rápida.

* **Criterios de Aceptación:**
    * El entrenador debe seleccionar: Mes, Año y Grupo de Deportistas (basado en la clasificación de la HU-02).
    * Se debe generar una tabla donde las filas sean los días del mes y las columnas incluyan: Día, Sesión AM, Sesión PM, Observaciones.
    * La tabla debe estar separada visualmente por semanas.
    * Debe tener un botón "Guardar" que persista los cambios de toda la grilla.

### HU-04: Visualización de Plan Personal (Vista Atleta)
**Como** Deportista,
**Quiero** ver mi plan de entrenamiento del día y de la semana,
**Para** saber qué ejercicios debo realizar.

* **Criterios de Aceptación:**
    * El deportista ve los entrenamientos asignados a la categoría que el entrenador le definió.
    * Debe poder ver el detalle del entrenamiento (series, repeticiones, tiempos).

---

## Modulo 3: Calendario y Eventos

### HU-05: Calendario Unificado
**Como** Usuario (Entrenador o Deportista),
**Quiero** visualizar un calendario mensual interactivo,
**Para** ver de un vistazo mis entrenamientos y los eventos importantes.

* **Criterios de Aceptación:**
    * El calendario debe diferenciar visualmente (por colores) entre "Entrenamiento" y "Evento" (torneo, reunión).
    * Al hacer clic en un día, se debe desplegar el detalle.

### HU-06: Gestión de Eventos
**Como** Entrenador,
**Quiero** crear eventos (Torneos, Chequeos, Reuniones),
**Para** que aparezcan automáticamente en el calendario de todos los deportistas involucrados.

* **Criterios de Aceptación:**
    * Formulario para crear evento con: Título, Fecha, Hora, Lugar, Descripción.
    * El evento debe ser visible para todos los usuarios activos en sus calendarios.

---

## Modulo 4: Foro y Comunidad

### HU-07: Publicación de Contenido
**Como** Usuario,
**Quiero** crear publicaciones en un foro que incluyan texto, imágenes o documentos,
**Para** compartir información, dudas o logros con el equipo.

* **Criterios de Aceptación:**
    * Editor de texto enriquecido básico.
    * Posibilidad de adjuntar archivos (PDF, JPG, PNG).
    * El post debe mostrar el autor y la fecha.

### HU-08: Interacción en el Foro
**Como** Usuario,
**Quiero** comentar las publicaciones de otros y responder a comentarios,
**Para** generar discusiones y resolver dudas.

* **Criterios de Aceptación:**
    * Hilos de comentarios anidados (respuestas a comentarios).

### HU-09: Encuestas
**Como** Usuario,
**Quiero** crear encuestas sencillas en el foro,
**Para** conocer la opinión del grupo sobre un tema.

* **Criterios de Aceptación:**
    * Posibilidad de definir una pregunta y múltiples opciones de respuesta.
    * Visualización de resultados tras votar.

---

## Modulo 5: Feedback y Seguimiento

### HU-10: Registro de Sensaciones (RPE)
**Como** Deportista,
**Quiero** registrar mis sensaciones (escala de esfuerzo, dolor, estado de ánimo) después de un entrenamiento,
**Para** que mi entrenador sepa cómo asimilé la carga.

* **Criterios de Aceptación:**
    * Formulario asociado a un entrenamiento específico.
    * Campo de texto libre para "Comentarios".
    * Escala numérica o visual para el esfuerzo percibido.

### HU-11: Monitoreo de Feedback
**Como** Entrenador,
**Quiero** ver las notas y sensaciones que han dejado mis deportistas,
**Para** ajustar los entrenamientos futuros si es necesario.

* **Criterios de Aceptación:**
    * Indicador visual en la vista del entrenador cuando un atleta ha dejado un comentario.
    * Posibilidad de leer el comentario sin salir de la vista de planificación.