package com.unsport.sport_hub.repository;

import com.unsport.sport_hub.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Spring Data JPA crea la implementación de esto automáticamente
    // solo por el nombre del método ("findByEmail").
    Optional<User> findByEmail(String email);

    // Método para verificar si un email ya existe (útil para registros)
    boolean existsByEmail(String email);

    // Buscar atletas por entrenador
    List<User> findByMyCoach(User coach);
}
