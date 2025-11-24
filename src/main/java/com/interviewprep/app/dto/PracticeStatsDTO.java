package com.interviewprep.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PracticeStatsDTO {
    private long total;
    private long known;
    private long weak;
}
