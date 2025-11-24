package com.interviewprep.app.dto;

import lombok.Data;

@Data
public class FlashcardDTO {
    private Long id;
    private String question;
    private String answer;
    private String difficulty;

    private Long categoryId;
    private String categoryName;
}
