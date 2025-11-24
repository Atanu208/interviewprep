package com.interviewprep.app.controller;

import com.interviewprep.app.entity.Category;
import com.interviewprep.app.entity.Flashcard;
import com.interviewprep.app.entity.QuestionPractice;
import com.interviewprep.app.entity.User;
import com.interviewprep.app.repository.CategoryRepository;
import com.interviewprep.app.repository.QuestionPracticeRepository;
import com.interviewprep.app.repository.UserRepository;
import com.interviewprep.app.service.FlashcardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flashcards")
@RequiredArgsConstructor
public class FlashcardController {

    private final FlashcardService flashcardService;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final QuestionPracticeRepository practiceRepo;


    @PostMapping
    public Flashcard create(@RequestBody Flashcard flashcard,
                            @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        Category category = categoryRepository.findById(flashcard.getCategory().getId())
                .orElseThrow();
        if (!category.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Cannot add flashcard to another user's category");
        }
        flashcard.setCategory(category);
        flashcard.setUser(user); // <-- ADD THIS LINE
        return flashcardService.create(flashcard);
    }

    @PutMapping("/practice/{id}/known")
    public Flashcard markKnown(@PathVariable Long id,
                            @AuthenticationPrincipal UserDetails userDetails) {

        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        Flashcard card = flashcardService.getByIdAndUser(id, user);
        QuestionPractice qp = practiceRepo.findByFlashcardIdAndUserId(id, user.getId())
                .orElseGet(() -> {
                    QuestionPractice newQp = new QuestionPractice();
                    newQp.setFlashcard(card);
                    newQp.setCategory(card.getCategory());
                    newQp.setUser(user);
                    return newQp;
                });
        qp.setKnown(true);
        qp.setWeak(false);
        practiceRepo.save(qp);
        return card;
    }

    @PutMapping("/practice/{id}/weak")
    public Flashcard markWeak(@PathVariable Long id,
                            @AuthenticationPrincipal UserDetails userDetails) {

        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        Flashcard card = flashcardService.getByIdAndUser(id, user);
        QuestionPractice qp = practiceRepo.findByFlashcardIdAndUserId(id, user.getId())
                .orElseGet(() -> {
                    QuestionPractice newQp = new QuestionPractice();
                    newQp.setFlashcard(card);
                    newQp.setCategory(card.getCategory());
                    newQp.setUser(user);
                    return newQp;
                });
        qp.setWeak(true);
        qp.setKnown(false);
        practiceRepo.save(qp);
        return card;
    }

    @GetMapping("/practice/random/{categoryId}")
    public Flashcard getRandomFlashcard(@PathVariable Long categoryId,
                                        @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        List<Flashcard> flashcards = flashcardService.getByCategoryAndUser(categoryId, user);
        if (flashcards.isEmpty()) {
            return null; // or throw exception
        }
        int randomIndex = (int) (Math.random() * flashcards.size());
        return flashcards.get(randomIndex);
    }

    @GetMapping
    public List<Flashcard> getAll(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        return flashcardService.getByUser(user);
    }

    @GetMapping("/{id}")
    public Flashcard getById(@PathVariable Long id,
                             @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        return flashcardService.getByIdAndUser(id, user);
    }

    @GetMapping("/category/{categoryId}")
    public List<Flashcard> getByCategory(@PathVariable Long categoryId,
                                         @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        return flashcardService.getByCategoryAndUser(categoryId, user);
    }

    @PutMapping("/{id}")
    public Flashcard update(@PathVariable Long id,
                            @RequestBody Flashcard flashcard,
                            @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        return flashcardService.updateForUser(id, flashcard, user);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id,
                         @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        flashcardService.deleteForUser(id, user);
        return "Deleted successfully";
    }
}
