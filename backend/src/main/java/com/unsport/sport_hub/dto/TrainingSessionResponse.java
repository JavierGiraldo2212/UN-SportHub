package com.unsport.sport_hub.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDate;

@Data
@Builder
public class TrainingSessionResponse {
    private Long id;
    private LocalDate date;
    private String description;
    private String trainingType; // Devolvemos "CARRERA" o "FUERZA"
    private String categoryName;
    private String coachName;
}
