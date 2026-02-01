package com.unsport.sport_hub.dto;

import com.unsport.sport_hub.enums.TrainingType;
import lombok.Data;
import java.time.LocalDate;

@Data
public class TrainingSessionRequest {
    private LocalDate date;
    private String description; // El texto del entreno
    private TrainingType trainingType; // CARRERA o FUERZA
    private Long categoryId; // A quién va dirigido (ID de categoría)
    private Long coachId; // Quién lo creó (ID del entrenador)
}
