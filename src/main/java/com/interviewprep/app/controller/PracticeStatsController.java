package com.interviewprep.app.controller;

import com.interviewprep.app.dto.CategoryStatsDTO;
import com.interviewprep.app.dto.PracticeStatsDTO;
import com.interviewprep.app.entity.QuestionPractice;
import com.interviewprep.app.entity.User;
import com.interviewprep.app.repository.CategoryRepository;
import com.interviewprep.app.repository.QuestionPracticeRepository;
import com.interviewprep.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/practice/stats")
@RequiredArgsConstructor
public class PracticeStatsController {

    private final QuestionPracticeRepository practiceRepo;
    private final CategoryRepository categoryRepo;
    private final UserRepository userRepository;

    @GetMapping("/overall")
    public PracticeStatsDTO getOverallStats(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        long total = practiceRepo.countByUserId(user.getId());
        long known = practiceRepo.countByUserIdAndKnownTrue(user.getId());
        long weak = practiceRepo.countByUserIdAndWeakTrue(user.getId());
        return new PracticeStatsDTO(total, known, weak);
    }

    @GetMapping("/category")
    public List<CategoryStatsDTO> getCategoryStats(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();

        return categoryRepo.findAll().stream()
                .map(cat -> {
                    List<QuestionPractice> list = practiceRepo.findByCategoryIdAndUserId(cat.getId(), user.getId());
                    if (list.isEmpty()) return null; // skip categories with no practice
                    long known = list.stream().filter(QuestionPractice::isKnown).count();
                    long weak = list.stream().filter(QuestionPractice::isWeak).count();
                    return new CategoryStatsDTO(cat.getName(), known, weak);
                })
                .filter(dto -> dto != null)
                .toList();
    }

}
