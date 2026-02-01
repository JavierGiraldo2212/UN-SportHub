package com.unsport.sport_hub.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Table(name = "sport_categories")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SportCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name; // Ej: "Fondo", "10K"

    // RELACIÓN REFLEXIVA (Padre)
    // Una categoría puede tener una categoría "padre".
    // Ej: "10K" tiene como padre a "Fondo". "Fondo" tiene padre NULL.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private SportCategory parent;

    // RELACIÓN INVERSA (Hijos)
    // Una categoría puede tener muchas subcategorías.
    // Ej: "Fondo" tiene como hijos a ["10K", "5K"].
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<SportCategory> subCategories;
}