package com.unsport.sport_hub.bootstrap;

import com.unsport.sport_hub.model.SportCategory;
import com.unsport.sport_hub.model.User;
import com.unsport.sport_hub.enums.Role;
import com.unsport.sport_hub.repository.SportCategoryRepository;
import com.unsport.sport_hub.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
//import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final SportCategoryRepository categoryRepository;
    private final PasswordEncoder passwordEncoder;

    // Inyección de dependencias por constructor
    public DataLoader(UserRepository userRepository,
            SportCategoryRepository categoryRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        loadCategories();
        loadUsers();
    }

    private void loadCategories() {
        if (categoryRepository.count() == 0) {
            // 1. Crear Categoría VELOCIDAD
            SportCategory velocidad = SportCategory.builder().name("Velocidad").build();
            SportCategory c100 = SportCategory.builder().name("100m").parent(velocidad).build();
            SportCategory c200 = SportCategory.builder().name("200m").parent(velocidad).build();
            SportCategory c400 = SportCategory.builder().name("400m").parent(velocidad).build();

            // Asignar hijos al padre para guardar en cascada
            velocidad.setSubCategories(Arrays.asList(c100, c200, c400));
            categoryRepository.save(velocidad);

            // 2. Crear Categoría SEMIFONDO
            SportCategory semifondo = SportCategory.builder().name("Semifondo").build();
            SportCategory c800 = SportCategory.builder().name("800m").parent(semifondo).build();
            SportCategory c1500 = SportCategory.builder().name("1500m").parent(semifondo).build();

            semifondo.setSubCategories(Arrays.asList(c800, c1500));
            categoryRepository.save(semifondo);

            // 3. Crear Categoría FONDO
            SportCategory fondo = SportCategory.builder().name("Fondo").build();
            SportCategory c5k = SportCategory.builder().name("5K").parent(fondo).build();
            SportCategory c10k = SportCategory.builder().name("10K").parent(fondo).build();

            fondo.setSubCategories(Arrays.asList(c5k, c10k));
            categoryRepository.save(fondo); // Aquí guardamos "Fondo" y por cascada se guardan "5K" y "10K"

            System.out.println("✅ Categorías cargadas exitosamente.");
        }
    }

    private void loadUsers() {
        if (userRepository.count() == 0) {
            // Crear Entrenador
            User coach = User.builder()
                    .email("admin@unsport.com")
                    .password(passwordEncoder.encode("123456")) // Contraseña encriptada
                    .firstName("Entrenador")
                    .lastName("Principal")
                    .role(Role.COACH)
                    .isActive(true)
                    .build();

            userRepository.save(coach);

            // Crear Atleta (Asignado a 10K)
            // Primero buscamos la categoría 10K que acabamos de crear
            // Nota: En un caso real, validaríamos que exista.
            SportCategory cat10k = categoryRepository.findByParentId(
                    categoryRepository.findAll().stream()
                            .filter(c -> "Fondo".equals(c.getName()))
                            .findFirst().get().getId())
                    .stream().filter(c -> "10K".equals(c.getName())).findFirst().orElse(null);

            User athlete = User.builder()
                    .email("atleta@unsport.com")
                    .password(passwordEncoder.encode("123456"))
                    .firstName("Juan")
                    .lastName("Corredor")
                    .role(Role.ATHLETE)
                    .sportCategory(cat10k) // Asignamos su especialidad
                    .isActive(true)
                    .build();

            userRepository.save(athlete);
            System.out.println("✅ Usuarios de prueba cargados: admin@unsport.com / atleta@unsport.com");
        }
    }
}
