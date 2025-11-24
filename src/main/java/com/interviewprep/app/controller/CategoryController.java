package com.interviewprep.app.controller;

import com.interviewprep.app.dto.CategoryDTO;
import com.interviewprep.app.dto.CategoryResponseDTO;
import com.interviewprep.app.entity.Category;
import com.interviewprep.app.entity.User;
import com.interviewprep.app.repository.UserRepository;
import com.interviewprep.app.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;
    private final UserRepository userRepository;

    @PostMapping
public CategoryResponseDTO create(@RequestBody CategoryDTO request,
                                  @AuthenticationPrincipal UserDetails userDetails) {

    User user = userRepository.findByUsername(userDetails.getUsername())
            .orElseThrow();

    Category category = new Category();
    category.setName(request.getName());
    category.setUser(user);

    Category saved = categoryService.create(category);

    CategoryResponseDTO dto = new CategoryResponseDTO();
    dto.setId(saved.getId());
    dto.setName(saved.getName());
    dto.setFlashcards(null);

    return dto;
}


    @GetMapping
    public List<CategoryDTO> getAll(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        return categoryService.getByUser(user).stream()
                .map(cat -> {
                    CategoryDTO dto = new CategoryDTO();
                    dto.setId(cat.getId());
                    dto.setName(cat.getName());
                    return dto;
                })
                .toList();
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id,
                         @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        return categoryService.deleteByIdAndUser(id, user);
    }
}
