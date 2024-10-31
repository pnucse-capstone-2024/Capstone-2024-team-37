package com.pnu.pickle.project.dao;

import com.pnu.pickle.project.entity.Project;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {
    Boolean existsByDomain(String domain);
    Optional<Project> findById(Long id);
    List<Project> findByGroupId(Long groupId);
    List<Project> findByOwnerId(Long ownerId);
}
