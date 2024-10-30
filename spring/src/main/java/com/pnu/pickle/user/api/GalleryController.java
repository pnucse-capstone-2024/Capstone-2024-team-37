package com.pnu.pickle.user.api;

import com.pnu.pickle.global.response.BaseAPIResponseDto;
import com.pnu.pickle.group.dto.GroupProject;
import com.pnu.pickle.project.dao.ProjectAuthorityRepository;
import com.pnu.pickle.project.dao.ProjectImageRepository;
import com.pnu.pickle.project.dao.ProjectRepository;
import com.pnu.pickle.project.entity.Project;
import com.pnu.pickle.project.entity.ProjectAuthority;
import com.pnu.pickle.project.entity.ProjectImage;
import com.pnu.pickle.user.entity.User;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/gallery")
public class GalleryController {

    private final ProjectImageRepository projectImageRepository;
    private final ProjectRepository projectRepository;

    @GetMapping
    @Operation(
            summary = "갤러리 프로젝트 가져오는 API",
            description = ""
    )
    public ResponseEntity<BaseAPIResponseDto<List<GroupProject>>> getUserProject(@RequestParam(required = false) String order){

        List<Project> allProjects = (List<Project>) projectRepository.findAll();
        List<GroupProject> projects = new ArrayList<>();

        allProjects.forEach((project) -> {

            String projectImageUrl = "https://pickle-avatar.s3.amazonaws.com/bluee.svg";

            List<ProjectImage> images = projectImageRepository.findByProjectId(project.getId());

            if(!images.isEmpty()) {
                projectImageUrl = images.getFirst().getImage_url();
            }

            GroupProject groupProject = new GroupProject(
                    project.getId(),
                    project.getGroup().getName(),
                    project.getGroup().getImage(),
                    project.getName(),
                    projectImageUrl,
                    project.getDescription()
            );

            projects.add(groupProject);
        });

        if(Objects.equals(order, "like")){
            projects.sort((p1, p2) -> p2.getLikes().compareTo(p1.getLikes()));
        }

        if(Objects.equals(order, "view")){
            projects.sort((p1, p2) -> p2.getViews().compareTo(p1.getViews()));
        }

        BaseAPIResponseDto responseDto = BaseAPIResponseDto.builder()
                .message("all project gallery info")
                .data(projects)
                .build();

        return ResponseEntity.ok().body(responseDto);
    }
}
