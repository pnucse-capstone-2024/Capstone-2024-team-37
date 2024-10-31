package com.pnu.pickle.group.service;

import com.pnu.pickle.group.dao.GroupRepository;
import com.pnu.pickle.group.dao.GroupMembershipRepository;
import com.pnu.pickle.group.dto.CreateGroupDto;
import com.pnu.pickle.group.dto.groupMember.DeleteMemberDto;
import com.pnu.pickle.group.dto.groupMember.InviteMemberDto;
import com.pnu.pickle.group.entity.Group;
import com.pnu.pickle.group.entity.GroupMembership;
import com.pnu.pickle.group.entity.MemberGroupRole;
import com.pnu.pickle.user.entity.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;


@Service
@RequiredArgsConstructor
public class GroupService {
    private final GroupRepository groupRepository;
    private final GroupMembershipRepository groupMembershipRepository;

    @Transactional
    public Group createDefaultGroup(User user) {

        // 그룹 생성
        Group group = new Group();
        group.setName(user.getUsername() + "_Default");
        group.setDescription("Default group for " + user.getUsername());
        group.setImage("/public/group/default.png");
        group = groupRepository.save(group);

        // GroupMembership 생성 및 저장
        GroupMembership groupMembership = new GroupMembership();
        groupMembership.setUser(user);
        groupMembership.setGroup(group);
        groupMembership.setAuthority(MemberGroupRole.OWNER);
        groupMembershipRepository.save(groupMembership);

        // 양방향 관계 설정
        user.getMemberGroups().add(groupMembership);
        group.getGroupMembers().add(groupMembership);

        return group;
    }

    @Transactional
    public Group createGroupByUser(User user, CreateGroupDto createGroupDto) {

        // 그룹 생성
        Group group = new Group();
        group.setName(createGroupDto.getGroupName());
        group.setDescription(createGroupDto.getGroupDescription());
        group.setImage("/public/group/default.png");
        group = groupRepository.save(group);

        // JoinGroup 생성 및 저장
        GroupMembership groupMembership = new GroupMembership();
        groupMembership.setUser(user);
        groupMembership.setGroup(group);
        groupMembership.setAuthority(MemberGroupRole.ADMIN);
        groupMembershipRepository.save(groupMembership);

        // 양방향 관계 설정
        user.getMemberGroups().add(groupMembership);
        group.getGroupMembers().add(groupMembership);

        return group;
    }

    @Transactional
    public Long inviteMemberToGroup(User targetUser, InviteMemberDto inviteMemberDto) {
        Group group = groupRepository.findById(inviteMemberDto.getGroupId()).orElseThrow();

        // GroupMembership 생성 및 저장
        GroupMembership groupMembership = new GroupMembership();
        groupMembership.setUser(targetUser);
        groupMembership.setGroup(group);
        groupMembership.setAuthority(MemberGroupRole.MEMBER);

        // 양방향 관계 설정
        targetUser.addMemberGroup(groupMembership);
        group.addGroupMember(groupMembership);

        groupMembershipRepository.save(groupMembership);

        return group.getId();
    }

    public GroupMembership getUserGroupMembership(User user, Long groupId) {
        Group group = groupRepository.findById(groupId).orElse(null);
        List<GroupMembership> groupMembershipList = Objects.requireNonNull(group).getGroupMembers();
        for(GroupMembership groupMembership: groupMembershipList) {
            if(Objects.equals(groupMembership.getUser().getUsername(), user.getUsername())) {
                return groupMembership;
            }
        }
        return null;
    }

    public GroupMembership getUserGroupMembershipByUsername(String username, Long groupId) {
        Group group = groupRepository.findById(groupId).orElse(null);
        List<GroupMembership> groupMembershipList = Objects.requireNonNull(group).getGroupMembers();
        for(GroupMembership groupMembership: groupMembershipList) {
            if(Objects.equals(groupMembership.getUser().getUsername(), username)) {
                return groupMembership;
            }
        }
        return null;
    }

    public Group getGroupById(Long groupId){
        return groupRepository.findById(groupId).orElse(null);
    }

    public Boolean groupIdExist(Long groupId) {
        return groupRepository.existsById(groupId);
    }

    public void setUserGroupMembership(GroupMembership targetGroupMembership){
        groupMembershipRepository.save(targetGroupMembership);
    }


    public void deleteMemberFromGroup(User targetUser, DeleteMemberDto deleteMemberDto) {
        Group group = groupRepository.findById(deleteMemberDto.getGroupId()).orElse(null);
        GroupMembership groupMembership = groupMembershipRepository.findByGroupIdAndUserId(deleteMemberDto.getGroupId(), targetUser.getId());
        Objects.requireNonNull(group).getGroupMembers().remove(groupMembership);
        groupMembershipRepository.delete(Objects.requireNonNull(groupMembership));
    }
}
