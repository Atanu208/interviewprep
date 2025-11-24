package com.interviewprep.app.controller;

import com.interviewprep.app.entity.QuestionPractice;
import com.interviewprep.app.entity.User;
import com.interviewprep.app.repository.CategoryRepository;
import com.interviewprep.app.repository.QuestionPracticeRepository;
import com.interviewprep.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/practice")
@RequiredArgsConstructor
public class QuestionPracticeController {

    private final QuestionPracticeRepository repo;
    private final CategoryRepository categoryRepo;
    private final UserRepository userRepository;

    @PostMapping
    public QuestionPractice add(@RequestBody QuestionPractice qp,
                                @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        qp.setUser(user);
        return repo.save(qp);
    }

    @GetMapping
    public List<QuestionPractice> all(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        return repo.findByUserId(user.getId());
    }

    @GetMapping("/category/{categoryId}")
    public List<QuestionPractice> byCategory(@PathVariable Long categoryId,
                                             @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        List<QuestionPractice> list = repo.findByCategoryIdAndUserId(categoryId, user.getId());
        Collections.shuffle(list);
        return list;
    }

    @GetMapping("/random/{categoryId}")
    public QuestionPractice random(@PathVariable Long categoryId,
                                   @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        List<QuestionPractice> list = repo.findByCategoryIdAndUserId(categoryId, user.getId());
        Collections.shuffle(list);
        return list.isEmpty() ? null : list.get(0);
    }

    @PutMapping("/{id}/known")
    public QuestionPractice markKnown(@PathVariable Long id,
                                      @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        QuestionPractice q = repo.findByIdAndUserId(id, user.getId());
        q.setKnown(true);
        q.setWeak(false);
        return repo.save(q);
    }

    @PutMapping("/{id}/weak")
    public QuestionPractice markWeak(@PathVariable Long id,
                                     @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        QuestionPractice q = repo.findByIdAndUserId(id, user.getId());
        q.setWeak(true);
        q.setKnown(false);
        return repo.save(q);
    }

}
