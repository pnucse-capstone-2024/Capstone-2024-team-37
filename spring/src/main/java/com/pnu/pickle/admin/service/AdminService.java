package com.pnu.pickle.admin.service;

import com.pnu.pickle.admin.dto.GetStatisticInfoResDto;
import com.pnu.pickle.admin.exception.NoProjectException;
import com.pnu.pickle.project.dao.ContainerDetailRepository;
import com.pnu.pickle.project.dao.ProjectRepository;
import com.pnu.pickle.project.entity.Project;
import com.pnu.pickle.project.entity.ProjectType;
import com.pnu.pickle.user.dao.UserRepository;
import com.pnu.pickle.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ContainerDetailRepository containerDetailRepository;

    public GetStatisticInfoResDto getStatisticInfo(){
        return GetStatisticInfoResDto.builder()
                .totalProject(projectRepository.count())
                .totalContainer(containerDetailRepository.count())
                .build();
    }

    public boolean getProjectAccessAuthority(String username, String domain){
        User user = userRepository.findByUsername(username);

        if(user == null){
            throw new NoProjectException("no User ");
        }
        List<Project> userProjects = projectRepository.findByOwnerId(user.getId());
        Project foundProject = null;

        for (Project project : userProjects) {
            String defaultDomain = project.getDomain();
            if (domain.endsWith(defaultDomain)){
                foundProject = project;
            }
        }

        if (foundProject == null){
            throw new NoProjectException("There is no project ends with the domain: " + domain);
        }

        return foundProject.getProjectType().equals(ProjectType.PUBLIC);
    }
}
