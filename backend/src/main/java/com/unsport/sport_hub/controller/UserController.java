package com.unsport.sport_hub.controller;

import com.unsport.sport_hub.dto.AthleteUpdateRequest;
import com.unsport.sport_hub.dto.RegisterRequest;
import com.unsport.sport_hub.dto.UserResponse;
import com.unsport.sport_hub.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.unsport.sport_hub.dto.UserUpdateRequest;
import jakarta.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // GET /api/users -> Listar todos
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // POST /api/users/register -> Crear uno nuevo
    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(userService.registerUser(request));
    }

    // PUT /api/users/profile -> Actualizar mis datos
    @PutMapping("/profile")
    public ResponseEntity<UserResponse> updateProfile(
            @RequestBody @Valid UserUpdateRequest request,
            Principal principal // Spring inyecta aquí al usuario del Token
    ) {
        // principal.getName() nos da el email del token JWT automáticamente
        return ResponseEntity.ok(userService.updateProfile(principal.getName(), request));
    }

    // GET /api/users/my-athletes (Solo para Coaches)
    @GetMapping("/my-athletes")
    public ResponseEntity<List<UserResponse>> getMyAthletes(Principal principal) {
        return ResponseEntity.ok(userService.getMyAthletes(principal.getName()));
    }

    // PUT /api/users/{id}/status (Aprobar/Categorizar)
    @PutMapping("/{id}/status")
    public ResponseEntity<UserResponse> updateAthleteStatus(
            @PathVariable Long id,
            @RequestBody AthleteUpdateRequest request) {
        return ResponseEntity.ok(userService.updateAthleteStatus(id, request));
    }
}
