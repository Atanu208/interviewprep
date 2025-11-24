package com.interviewprep.app.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionPractice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String question;
    private String answer;

    @ManyToOne
    @JoinColumn(name = "flashcard_id") // new field
    private Flashcard flashcard;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    private String difficulty; // EASY / MEDIUM / HARD

    private boolean known; // user marks as known
    private boolean weak;  // user marks as weak

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
