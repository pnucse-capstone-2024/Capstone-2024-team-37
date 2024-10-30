package com.pnu.pickle.project.dao;

import com.pnu.pickle.project.entity.ProjectImage;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProjectImageRepository extends CrudRepository<ProjectImage, Long> {
    List<ProjectImage> findByProjectId(Long projectId);
}
