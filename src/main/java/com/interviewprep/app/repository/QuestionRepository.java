package com.interviewprep.app.repository;

import com.interviewprep.app.entity.Question;
import com.interviewprep.app.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByCategory(Category category);
}
