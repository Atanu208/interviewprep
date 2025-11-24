package com.interviewprep.app.dto;

import lombok.Data;

@Data
public class CategoryResponseDTO {
    private Long id;
    private String name;
    private Object flashcards = null; // always null response
}
