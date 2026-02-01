package com.unsport.sport_hub.controller;

import com.unsport.sport_hub.dto.TrainingSessionRequest;
import com.unsport.sport_hub.dto.TrainingSessionResponse;
import com.unsport.sport_hub.service.TrainingSessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/training-sessions")
@RequiredArgsConstructor
public class TrainingSessionController {

    private final TrainingSessionService trainingSessionService;

    // Crear un nuevo entrenamiento
    @PostMapping
    public ResponseEntity<TrainingSessionResponse> createSession(@RequestBody TrainingSessionRequest request) {
        return ResponseEntity.ok(trainingSessionService.createOrUpdateSession(request));
    }

    // Obtener grilla mensual
    // Ejemplo de uso: GET /api/training-sessions?categoryId=2&year=2025&month=11
    @GetMapping
    public ResponseEntity<List<TrainingSessionResponse>> getMonthlySessions(
            @RequestParam Long categoryId,
            @RequestParam int year,
            @RequestParam int month) {

        return ResponseEntity.ok(trainingSessionService.getMonthlySessions(categoryId, year, month));
    }
}
