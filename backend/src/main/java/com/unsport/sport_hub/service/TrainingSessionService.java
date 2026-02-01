package com.unsport.sport_hub.service;

import com.unsport.sport_hub.dto.TrainingSessionRequest;
import com.unsport.sport_hub.dto.TrainingSessionResponse;
import com.unsport.sport_hub.model.SportCategory;
import com.unsport.sport_hub.model.TrainingSession;
import com.unsport.sport_hub.model.User;
import com.unsport.sport_hub.repository.SportCategoryRepository;
import com.unsport.sport_hub.repository.TrainingSessionRepository;
import com.unsport.sport_hub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TrainingSessionService {

    private final TrainingSessionRepository trainingSessionRepository;
    private final UserRepository userRepository;
    private final SportCategoryRepository categoryRepository;

    /**
     * Crear o Actualizar una sesión de entrenamiento
     */
    @Transactional
    public TrainingSessionResponse createOrUpdateSession(TrainingSessionRequest request) {
        // 1. Buscar Entrenador
        User coach = userRepository.findById(request.getCoachId())
                .orElseThrow(() -> new RuntimeException("Entrenador no encontrado"));

        // 2. Buscar Categoría (ej. "10K")
        SportCategory category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        // 3. Crear Entidad
        // Nota: Si quisiéramos editar uno existente, aquí buscaríamos por ID.
        // Por ahora asumimos creación de uno nuevo para esa fecha.
        TrainingSession session = TrainingSession.builder()
                .date(request.getDate())
                .description(request.getDescription())
                .trainingType(request.getTrainingType())
                .category(category)
                .coach(coach)
                .build();

        TrainingSession savedSession = trainingSessionRepository.save(session);

        return mapToResponse(savedSession);
    }

    /**
     * Obtener entrenamientos de un mes específico para una categoría
     */
    public List<TrainingSessionResponse> getMonthlySessions(Long categoryId, int year, int month) {
        // Calcular primer y último día del mes
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

        // Consultar repositorio
        List<TrainingSession> sessions = trainingSessionRepository.findByCategoryIdAndDateBetween(
                categoryId, startDate, endDate);

        // Convertir lista de Entidades a lista de DTOs
        return sessions.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // Mapper auxiliar
    private TrainingSessionResponse mapToResponse(TrainingSession session) {
        return TrainingSessionResponse.builder()
                .id(session.getId())
                .date(session.getDate())
                .description(session.getDescription())
                .trainingType(session.getTrainingType().name())
                .categoryName(session.getCategory().getName())
                .coachName(session.getCoach().getFirstName() + " " + session.getCoach().getLastName())
                .build();
    }
}
