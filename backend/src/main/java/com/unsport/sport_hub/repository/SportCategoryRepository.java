package com.unsport.sport_hub.repository;

import com.unsport.sport_hub.model.SportCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SportCategoryRepository extends JpaRepository<SportCategory, Long> {

    // Buscar categorías principales (las que no tienen padre, ej: "Fondo")
    List<SportCategory> findByParentIsNull();

    // Buscar subcategorías dado un ID de padre (ej: todas las de "Fondo")
    List<SportCategory> findByParentId(Long parentId);
}
