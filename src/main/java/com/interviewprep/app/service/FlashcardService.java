package com.interviewprep.app.service;

import com.interviewprep.app.entity.Flashcard;
import com.interviewprep.app.entity.Category;
import com.interviewprep.app.entity.User;
import com.interviewprep.app.repository.CategoryRepository;
import com.interviewprep.app.repository.FlashcardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FlashcardService {

    private final FlashcardRepository flashcardRepository;
    private final CategoryRepository categoryRepository;

    public Flashcard create(Flashcard flashcard) {
        if (flashcard.getCategory() != null && flashcard.getCategory().getId() != null) {
            Category category = categoryRepository.findById(flashcard.getCategory().getId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            flashcard.setCategory(category);
        }
        return flashcardRepository.save(flashcard);
    }

    public List<Flashcard> getAll() {
        return flashcardRepository.findAll();
    }

    public Flashcard markKnown(Long id, User user) {
    Flashcard flashcard = getByIdAndUser(id, user);
    flashcard.setDifficulty("EASY");
    return flashcardRepository.save(flashcard);
    }

    public Flashcard markWeak(Long id, User user) {
        Flashcard flashcard = getByIdAndUser(id, user);
        flashcard.setDifficulty("HARD");
        return flashcardRepository.save(flashcard);
    }


    public Flashcard getById(Long id) {
        return flashcardRepository.findById(id).orElse(null);
    }

    public List<Flashcard> getByCategory(Long categoryId) {
        return flashcardRepository.findByCategoryId(categoryId);
    }

    // --- USER-SPECIFIC METHODS ---
    public List<Flashcard> getByUser(User user) {
        return flashcardRepository.findByUser(user);
    }

    public Flashcard getByIdAndUser(Long id, User user) {
        return flashcardRepository.findByIdAndUser(id, user);
    }

    public List<Flashcard> getByCategoryAndUser(Long categoryId, User user) {
        return flashcardRepository.findByCategoryIdAndUser(categoryId, user);
    }

    public Flashcard updateForUser(Long id, Flashcard updated, User user) {
        Flashcard existing = getByIdAndUser(id, user);
        if (existing == null) return null;

        existing.setQuestion(updated.getQuestion());
        existing.setAnswer(updated.getAnswer());
        existing.setDifficulty(updated.getDifficulty());

        if (updated.getCategory() != null && updated.getCategory().getId() != null) {
            Category category = categoryRepository.findById(updated.getCategory().getId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            if (!category.getUser().getId().equals(user.getId())) {
                throw new RuntimeException("Cannot move flashcard to another user's category");
            }
            existing.setCategory(category);
        }

        return flashcardRepository.save(existing);
    }

    public void deleteForUser(Long id, User user) {
        Flashcard existing = getByIdAndUser(id, user);
        if (existing != null) {
            flashcardRepository.delete(existing);
        } else {
            throw new RuntimeException("Flashcard not found or does not belong to user");
        }
    }
}
