package com.pnu.pickle.project.dao;

import com.pnu.pickle.project.entity.ProjectAuthority;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProjectAuthorityRepository extends CrudRepository<ProjectAuthority, Long> {
    List<ProjectAuthority> findByProjectId(Long projectId);
    ProjectAuthority findByProjectIdAndUserId(Long projectId, Long userId);
    List<ProjectAuthority> findByUserId(Long userId);
}
