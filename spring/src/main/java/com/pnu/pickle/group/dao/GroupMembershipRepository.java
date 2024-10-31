package com.pnu.pickle.group.dao;

import com.pnu.pickle.group.entity.GroupMembership;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupMembershipRepository extends CrudRepository<GroupMembership, Long> {
    GroupMembership findByGroupIdAndUserId(Long groupId, Long userId);
}
