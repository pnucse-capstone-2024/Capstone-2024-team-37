package com.pnu.pickle.user.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.pnu.pickle.group.entity.GroupMembership;
import jakarta.persistence.*;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
public class User {

    @Id
    @GeneratedValue
    @Column(name = "user_id")
    private Long id;

    @Column(unique = true)
    private String username;

    @Column(name = "user_image")
    private String userImage;

    @Column(unique = true)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private List<GroupMembership> memberGroups = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "created_time")
    private LocalDateTime createdTime;

    @UpdateTimestamp
    @Column(name = "updated_time")
    private LocalDateTime updatedTime;

    protected User() {}

    public static User createUser(String username, String email, String password, String userImage) {
        User user = new User();
        user.username = username;
        user.email = email;
        user.password = password;
        user.userImage = userImage;
        return user;
    }

    // User 클래스에 추가
    public void addMemberGroup(GroupMembership groupMembership) {
        memberGroups.add(groupMembership);
        groupMembership.setUser(this);
    }
}
