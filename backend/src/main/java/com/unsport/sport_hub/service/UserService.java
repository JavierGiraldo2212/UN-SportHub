package com.unsport.sport_hub.service;

import com.unsport.sport_hub.dto.AthleteUpdateRequest;
import com.unsport.sport_hub.dto.RegisterRequest;
import com.unsport.sport_hub.dto.UserResponse;
import com.unsport.sport_hub.dto.UserUpdateRequest;
import com.unsport.sport_hub.model.User;
import com.unsport.sport_hub.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import com.unsport.sport_hub.enums.Role;
import com.unsport.sport_hub.enums.UserStatus;
import com.unsport.sport_hub.model.SportCategory;
import com.unsport.sport_hub.repository.SportCategoryRepository;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final SportCategoryRepository sportCategoryRepository;
    private final PasswordEncoder passwordEncoder;

    // Obtener todos los usuarios y convertirlos a DTOs
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // Registrar un nuevo usuario
    @Transactional
    public UserResponse registerUser(RegisterRequest request) {
        // 1. Validar que el email no exista
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }

        // 2. Crear el Builder
        User.UserBuilder userBuilder = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .role(request.getRole());

        // 3. Lógica según Rol
        if (request.getRole() == Role.ATHLETE) {
            userBuilder.status(UserStatus.PENDING); // Nace pendiente

            // Asignar Coach
            if (request.getCoachId() != null) {
                User coach = userRepository.findById(request.getCoachId()).orElse(null);
                userBuilder.myCoach(coach);
            }
            // Asignar Categoría (Preferencia)
            if (request.getCategoryId() != null) {
                SportCategory cat = sportCategoryRepository.findById(request.getCategoryId()).orElse(null);
                userBuilder.sportCategory(cat);
            }
        } else {
            // Si es Coach, entra activo (por ahora)
            userBuilder.status(UserStatus.ACTIVE);
        }

        // 4. Guardar en BD
        User savedUser = userRepository.save(userBuilder.build());

        // 5. Devolver respuesta
        return mapToResponse(savedUser);
    }

    // Obtener atletas de un entrenador
    public List<UserResponse> getMyAthletes(String coachEmail) {
        User coach = userRepository.findByEmail(coachEmail)
                .orElseThrow(() -> new RuntimeException("Entrenador no encontrado"));

        return userRepository.findByMyCoach(coach).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // Actualizar estado / categoría de un atleta
    public UserResponse updateAthleteStatus(Long athleteId, AthleteUpdateRequest request) {
        User athlete = userRepository.findById(athleteId)
                .orElseThrow(() -> new RuntimeException("Atleta no encontrado"));

        // Actualizar Status
        if (request.getStatus() != null) {
            athlete.setStatus(UserStatus.valueOf(request.getStatus()));
        }

        // Actualizar Categoría
        if (request.getCategoryName() != null) {
            // Buscamos la categoría por nombre (Asumiendo que es único o manejamos la
            // búsqueda)
            // Aquí simplificamos buscando en todas. Idealmente filtrar.
            SportCategory cat = sportCategoryRepository.findAll().stream()
                    .filter(c -> c.getName().equalsIgnoreCase(request.getCategoryName()))
                    .findFirst()
                    .orElse(null);

            if (cat != null && request.getSubCategoryName() != null) {
                // Buscar subcategoría dentro de la categoría padre
                SportCategory subCat = sportCategoryRepository.findByParentId(cat.getId()).stream()
                        .filter(c -> c.getName().equalsIgnoreCase(request.getSubCategoryName()))
                        .findFirst()
                        .orElse(cat); // Si no encuentra sub, deja la padre
                athlete.setSportCategory(subCat);
            } else if (cat != null) {
                athlete.setSportCategory(cat);
            }
        }

        return mapToResponse(userRepository.save(athlete));
    }

    public UserResponse updateProfile(String email, UserUpdateRequest request) {
        // 1. Buscamos al usuario por el email del token (Seguridad)
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // 2. Actualizamos SOLO los campos permitidos
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());

        // 3. Guardamos
        User updatedUser = userRepository.save(user);

        // 4. Devolvemos la respuesta actualizada
        return mapToResponse(updatedUser);
    }

    // Método auxiliar // Mapper manual (o usar MapStruct)
    private UserResponse mapToResponse(User user) {
        String catName = "Sin Asignar";
        String parentCatName = null;

        if (user.getSportCategory() != null) {
            catName = user.getSportCategory().getName();
            if (user.getSportCategory().getParent() != null) {
                parentCatName = user.getSportCategory().getParent().getName();
            }
        }

        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole().name())
                .status(user.getStatus() != null ? user.getStatus().name() : "PENDING")
                .categoryName(catName)
                .parentCategoryName(parentCatName)
                .build();
    }
}
