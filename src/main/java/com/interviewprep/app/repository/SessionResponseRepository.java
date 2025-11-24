package com.interviewprep.app.repository;

import com.interviewprep.app.entity.SessionResponse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SessionResponseRepository extends JpaRepository<SessionResponse, Long> {
    List<SessionResponse> findBySessionId(Long sessionId);
}
