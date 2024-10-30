package com.pnu.pickle.project.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class ProjectTemplate {
    private String templateTitle;
    private String subdomain;
    private String containerStack;
    private Map<String, String> envVars;
}
