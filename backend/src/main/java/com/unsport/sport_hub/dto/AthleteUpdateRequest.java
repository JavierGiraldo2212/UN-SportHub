package com.unsport.sport_hub.dto;

import lombok.Data;

@Data
public class AthleteUpdateRequest {
    private String status; // ACTIVE, INACTIVE, ETC
    private String categoryName;
    private String subCategoryName;
}
