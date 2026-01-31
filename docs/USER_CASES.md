# Casos de Uso - UN-SportHub

Este documento describe las interacciones entre los actores y el sistema utilizando diagramas UML.

## Actores del Sistema

* **Usuario No Autenticado:** Persona que accede a la web sin loguearse.
* **Deportista:** Usuario registrado que consume planes de entrenamiento.
* **Entrenador:** Usuario registrado con privilegios para crear planes y eventos.
* **Sistema:** Procesos automáticos (como validaciones o notificaciones).

---

## Diagrama 1: Gestión de Usuarios y Acceso

Este diagrama cubre el registro, inicio de sesión y la clasificación de los atletas.
![Diagrama de Gestión de Usuarios](https://img.plantuml.biz/plantuml/png/NP8nJWCn44LxdsAKAf4Iw2bGLY4499GYgr0XeS4xsRNaU29xbWPn90h44N8nnhk4iBH_lj__7dkU1AEqUsyyxGI48Rgw4QXS92kEWq4h766qJIr6nx1cA5gX8CvYnIF01AkMafnyDtJWA4wntQoGnfFGQReC4YdemTXD5uosCIP7OQWzmQZKaxH7sAvdPGRTjIymri1cCe8t0z0cifZKkA5QhH5ZegSmBicJjLeN8spOmtrmrg6VT2dRnNFlflYNq7iYb9JSyIkSh0zSk_3NLoHNP-u2XMgEnm-yNAO3PRwhiDBqMmuLJ-6HFDiiJO74Nlo65oaJj1ODBs3R0yKCPjsAQiTFFFUr_AfrtutfjWkpsVNW7WErh_pFs0FCpmCChTtUXz9GErU6ArWfDwyMjExEUQW8K1IAPawXod_d6m00)


### Descripción

1. **Registrarse:** Cualquier persona puede crear una cuenta indicando si es Entrenador o Deportista.
2. **Asignar Categoría:** Solo el Entrenador puede editar a un Deportista para asignarle su especialidad (ej. Fondo - 10K). Esto activa las funcionalidades específicas para el atleta.

---

## Diagrama 2: Planificación de Entrenamiento y Calendario

Este es el núcleo de la aplicación ("Core Domain"). Muestra cómo se crea y consume el entrenamiento.
![Diagrama de Planificación de Entrenamiento](https://img.plantuml.biz/plantuml/png/TLFBJXj14BpFLxHy8WVC7I6Bo2oSB5acS8eKDJFjzOZU6TGpIm9HFYOVa5C-mJz6pzfhTdaSLbgfkghwKNEUCafk6pPCwmmvWlXway5v8Pjz30PjZWAJAcIXW2xA1331FABTzDW5FKJ9NgKwx6lUC6KofaXWg9bWijZ-Tor7S0HxfSPJo742lmr0cyXYqh8hIiKK1PQC0HOKKelyFHpT5dMeVbdYBvt9pVp70WFMT2NU3IMqKYd-kTTOaYHLv9vrw-bd0OQS5TMgBqgvLaUqsW8bE5ejguFP9P6xGtl_YLKFm-ikqj3n8_fSI9dLOzd3oRSeWM9FAL2c3lh4S8vCmQ7u23V1hxtLqmmDUzpyCQOx5XmVpyPRWrCTbycMSL5tdU19PJFLKRR_SCmQDZG2HbxlaCFOPX-A8TYTvnGkFUlgGTS6gOLLP9t2roLg7v4ENc-mmm5qg7Wd16q0wfAcaQPkQIfenWkOJjysStRcW-NMqMncGbJvtNE8wtU1gtYlNzu4aFEQJqQenJFZT5UGD0VK8EWxsTsjL3oMS2ZkYFNhqmBOvjXi_sQzPAF2D3Kw9vGUpBd-bIVw0W00)

### Descripción

1. **Gestionar Plan Mensual:** El entrenador carga la matriz de entrenamientos para un grupo (ej. Velocistas) en un mes específico.
2. **Visualizar Plan:** El deportista ve solo lo que le corresponde según la asignación del entrenador.
3. **Eventos:** Los eventos creados por el entrenador aparecen en el calendario de todos los deportistas relevantes.

---

## Diagrama 3: Foro y Comunidad

Interacciones sociales dentro de la plataforma.
![Diagrama de Foro y Comunidad](https://img.plantuml.biz/plantuml/png/PP71IWCn48RlUOfXJ_LGzovbARGLF0YbM4-2n6JS1hAPPJ81HNogFa9VpCIwck8fCF__V_apMKRHB6dmokEhW12mwmy2rZ4QSHIKDa8CpJucpOvWjWd26BGbRjSu4elBYAi6T8HzH5Qg17NeFK9pVphQv0aimYqnDV2X0594esDMj-d5EwCPjXJbASmUy4selHjqZw5Ta_c1hfwBNWTND62G4ZmJZ3iTmsJEOb5h_mxZIC4YmvHqDDbtEFht2pXZ9c-2IPWVzbV1-zhrIEL-3F-CMK3rgLJP1SpdtM__UZ1rh6Vd8fUnV6Sz-6QhoGlNDGjkOB782yHWkqujyr4-zGi0)

### Descripción

Todos los usuarios autenticados tienen los mismos privilegios en el foro para fomentar la comunidad horizontal.

```

---
