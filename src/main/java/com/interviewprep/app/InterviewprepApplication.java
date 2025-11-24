package com.interviewprep.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import com.interviewprep.app.security.JwtConfig;

@SpringBootApplication
@EnableConfigurationProperties(JwtConfig.class)
public class InterviewprepApplication {

	public static void main(String[] args) {
		SpringApplication.run(InterviewprepApplication.class, args);
	}

}
