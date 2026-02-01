package com.unsport.sport_hub.dto;

import com.unsport.sport_hub.enums.Role;
import lombok.Data;

@Data
public class RegisterRequest {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private Role role; // COACH o ATHLETE
}
