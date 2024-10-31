package com.pnu.pickle.group.dao;

import com.pnu.pickle.group.entity.Group;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository extends CrudRepository<Group, Long> {
//    Group findByN(Long id);
}
