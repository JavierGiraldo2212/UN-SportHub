package com.unsport.sport_hub.service;

import com.unsport.sport_hub.dto.RegisterRequest;
import com.unsport.sport_hub.dto.UserResponse;
import com.unsport.sport_hub.model.User;
import com.unsport.sport_hub.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor // Inyecta automáticamente los campos 'final'
public class UserService {

    private final UserRepository userRepository;
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

        // 2. Crear la entidad
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword())) // Importante: Encriptar
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .role(request.getRole())
                .isActive(true)
                .build();

        // 3. Guardar en BD
        User savedUser = userRepository.save(user);

        // 4. Devolver respuesta
        return mapToResponse(savedUser);
    }

    // Método auxiliar para convertir Entidad -> DTO
    private UserResponse mapToResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole().name())
                .categoryName(user.getSportCategory() != null ? user.getSportCategory().getName() : "Sin Clasificar")
                .build();
    }
}
