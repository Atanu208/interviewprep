package com.interviewprep.app.service;

import com.interviewprep.app.entity.Category;
import com.interviewprep.app.entity.User;
import com.interviewprep.app.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public Category create(Category category) {
        return categoryRepository.save(category);
    }

    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    // NEW method to get user-specific categories
    public List<Category> getByUser(User user) {
        return categoryRepository.findByUser(user);
    }

    // NEW method to delete category by user
    public String deleteByIdAndUser(Long id, User user) {
        Category cat = categoryRepository.findByIdAndUser(id, user);
        if (cat != null) {
            categoryRepository.delete(cat);
            return "Category deleted successfully";
        } else {
            return "Category not found";
        }
    }
}
