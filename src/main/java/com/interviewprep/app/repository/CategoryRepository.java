package com.interviewprep.app.repository;

import com.interviewprep.app.entity.Category;
import com.interviewprep.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findByUser(User user);
    Category findByIdAndUser(Long id, User user);
}
