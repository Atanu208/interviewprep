package com.interviewprep.app.repository;

import com.interviewprep.app.entity.QuestionPractice;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface QuestionPracticeRepository extends JpaRepository<QuestionPractice, Long> {

    List<QuestionPractice> findByCategoryId(Long categoryId);

    // User-specific queries
    List<QuestionPractice> findByCategoryIdAndUserId(Long categoryId, Long userId);
    List<QuestionPractice> findByUserId(Long userId);

    QuestionPractice findByIdAndUserId(Long id, Long userId);

    long countByUserId(Long userId);

    // ✅ ADD THESE NEW METHODS
    long countByUserIdAndKnownTrue(Long userId);
    long countByUserIdAndWeakTrue(Long userId);

    // For markKnown / markWeak logic
    Optional<QuestionPractice> findByFlashcardIdAndUserId(Long flashcardId, Long userId);
}
