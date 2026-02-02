package com.unsport.sport_hub.controller;

import com.unsport.sport_hub.config.JwtService;
import com.unsport.sport_hub.dto.RegisterRequest;
import com.unsport.sport_hub.dto.UserResponse;
import com.unsport.sport_hub.model.User;
import com.unsport.sport_hub.repository.UserRepository;
import com.unsport.sport_hub.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody @Valid RegisterRequest request) {
        return ResponseEntity.ok(userService.registerUser(request));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

            User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
            String token = jwtService.generateToken(user);

            // Si el login es exitoso, devolvemos AuthResponse
            return ResponseEntity
                    .ok(new AuthResponse(token, user.getFirstName(), user.getLastName(), user.getRole().name()));

        } catch (org.springframework.security.authentication.DisabledException e) {
            // Manejo específico para usuarios inactivos / pendientes
            // Devolvemos un 403 o 401 con mensaje claro
            return ResponseEntity.status(403).body("Tu cuenta está pendiente de aprobación por tu entrenador.");
        } catch (Exception e) {
            // BadCredentials u otros
            return ResponseEntity.status(401).body("Credenciales incorrectas.");
        }
    }

    @Data
    public static class LoginRequest {
        private String email;
        private String password;
    }

    @Data
    @lombok.AllArgsConstructor
    public static class AuthResponse {
        private String token;
        private String firstName;
        private String lastName;
        private String role;
    }
}
