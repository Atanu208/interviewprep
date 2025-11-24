package com.interviewprep.app.repository;

import com.interviewprep.app.entity.Flashcard;
import com.interviewprep.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FlashcardRepository extends JpaRepository<Flashcard, Long> {
    List<Flashcard> findByCategoryId(Long categoryId);
    List<Flashcard> findByUser(User user);
    Flashcard findByIdAndUser(Long id, User user);
    List<Flashcard> findByCategoryIdAndUser(Long categoryId, User user);
}
