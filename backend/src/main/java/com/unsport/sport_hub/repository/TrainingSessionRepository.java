package com.unsport.sport_hub.repository;

import com.unsport.sport_hub.model.TrainingSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TrainingSessionRepository extends JpaRepository<TrainingSession, Long> {

    // Buscar entrenamientos de una categoría en un rango de fechas
    // SELECT * FROM sessions WHERE category_id = ? AND date BETWEEN ? AND ?
    List<TrainingSession> findByCategoryIdAndDateBetween(Long categoryId, LocalDate startDate, LocalDate endDate);

    // Buscar entrenamientos de una categoría específica para una fecha exacta
    List<TrainingSession> findByCategoryIdAndDate(Long categoryId, LocalDate date);
}
