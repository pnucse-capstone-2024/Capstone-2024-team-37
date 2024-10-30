package com.pnu.pickle.project.dao;

import com.pnu.pickle.project.entity.ContainerDetail;
import com.pnu.pickle.project.entity.ContainerEnv;
import org.springframework.data.repository.CrudRepository;

public interface ContainerEnvRepository extends CrudRepository<ContainerEnv, Long> {
}
