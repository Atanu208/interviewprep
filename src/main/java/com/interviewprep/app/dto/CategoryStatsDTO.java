package com.interviewprep.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CategoryStatsDTO {
    private String category;
    private long known;
    private long weak;
}
