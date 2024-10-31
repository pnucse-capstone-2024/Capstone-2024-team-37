package com.pnu.pickle.group.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "groups")
@Getter @Setter
public class Group {
    @Id @GeneratedValue
    @Column(name = "group_id")
    private Long id;

    private String name;

    private String description;

    private String image;

    @JsonManagedReference
    @OneToMany(mappedBy = "group")
    private List<GroupMembership> groupMembers = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "created_time")
    private LocalDateTime createdTime;

    @UpdateTimestamp
    @Column(name = "updated_time")
    private LocalDateTime updatedTime;

    // Group 클래스에 추가
    public void addGroupMember(GroupMembership groupMembership) {
        groupMembers.add(groupMembership);
        groupMembership.setGroup(this);
    }
}
