package com.unsport.sport_hub.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponse {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String role;
    private String categoryName; // Solo el nombre, no todo el objeto
}
