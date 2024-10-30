package com.pnu.pickle.project.entity;

import com.pnu.pickle.user.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "ProjectAuthority",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "project_id"}))
@Getter
@Setter
public class ProjectAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @Enumerated(EnumType.STRING)
    @Column(name = "permission", nullable = false)
    private Permission permission;

    // 기본 생성자
    public ProjectAuthority() {}

    // 사용자, 프로젝트, 권한을 지정하는 생성자
    public ProjectAuthority(User user, Project project, Permission permission) {
        this.user = user;
        this.project = project;
        this.permission = permission;
    }

}
